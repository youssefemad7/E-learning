import mongoose, { Model } from 'mongoose';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleDestroy,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Payment, PaymentProvider, PaymentStatus } from './payment.schema';
import { EnrollmentsService } from '../enrollments/enrollments.service';
import { PaymobService, PaymobTransaction } from './paymob.service';
import { UserRole } from '../users/user.schema';
import { Course, CourseStatus } from '../courses/course.schema';
import { CreatePaymentDto } from './create-payment.dto';

const PAYMENT_EXPIRATION_MS = 30 * 60 * 1000;
const EXPIRATION_CHECK_INTERVAL_MS = 60 * 1000;

@Injectable()
export class PaymentsService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PaymentsService.name);
  private expirationInterval?: NodeJS.Timeout;

  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
    @InjectModel(Course.name) private courseModel: Model<Course>,
    private paymobService: PaymobService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  onModuleInit() {
    void this.expirePendingPayments().catch((error: unknown) => {
      this.logger.error(
        'Initial pending-payment expiration check failed',
        error instanceof Error ? error.stack : String(error),
      );
    });

    this.expirationInterval = setInterval(() => {
      void this.expirePendingPayments().catch((error: unknown) => {
        this.logger.error(
          'Pending-payment expiration check failed',
          error instanceof Error ? error.stack : String(error),
        );
      });
    }, EXPIRATION_CHECK_INTERVAL_MS);

    this.expirationInterval.unref();
  }

  onModuleDestroy() {
    if (this.expirationInterval) {
      clearInterval(this.expirationInterval);
    }
  }

  // Atomically expire stale pending payments. Legacy records without expiresAt
  // use their createdAt timestamp and the same 30-minute policy.
  async expirePendingPayments() {
    const now = new Date();
    const legacyCutoff = new Date(now.getTime() - PAYMENT_EXPIRATION_MS);

    const result = await this.paymentModel.updateMany(
      {
        status: PaymentStatus.PENDING,
        $or: [
          { expiresAt: { $lte: now } },
          {
            expiresAt: { $exists: false },
            createdAt: { $lte: legacyCutoff },
          },
        ],
      },
      { $set: { status: PaymentStatus.EXPIRED } },
    );

    return result.modifiedCount;
  }

  async createPayment(
    courseId: string,
    createPaymentDto: CreatePaymentDto,
    user: { userId: string; email: string; role: UserRole },
  ) {
    if (user.role !== UserRole.STUDENT) {
      throw new ForbiddenException(
        "You are not allowed to enroll this course because You aren't student",
      );
    }

    if (!courseId || !mongoose.isValidObjectId(courseId)) {
      throw new BadRequestException('Invalid Course ID');
    }

    const course = await this.courseModel.findById(courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    if (course.status !== CourseStatus.PUBLISHED) {
      throw new ForbiddenException(
        "You are not allowed to enroll this course because course isn't published",
      );
    }

    if (course.price === 0) {
      throw new BadRequestException('This course is free');
    }

    const enrollment = await this.enrollmentsService.checkEnrollment(
      courseId,
      user.userId,
    );
    if (enrollment) {
      throw new ForbiddenException(
        'You are not allowed to enroll this course because you are already enroll it',
      );
    }

    const payment = new this.paymentModel({
      course: courseId,
      student: user.userId,
      amount: course.price,
      currency: 'EGP',
      status: PaymentStatus.PENDING,
      expiresAt: new Date(Date.now() + PAYMENT_EXPIRATION_MS),
    });
    await payment.save();

    const { intentionId, orderId, checkoutUrl } =
      await this.paymobService.createIntention({
        paymentId: payment._id.toString(),
        amount: payment.amount,
        currency: payment.currency,
        courseTitle: course.title,
        billingData: {
          firstName: createPaymentDto.firstName,
          lastName: createPaymentDto.lastName,
          email: user.email,
          phoneNumber: createPaymentDto.phoneNumber,
        },
      });

    payment.intentionId = intentionId;
    payment.providerOrderId = orderId;
    await payment.save();

    return {
      paymentId: payment._id,
      status: payment.status,
      expiresAt: payment.expiresAt,
      checkoutUrl,
    };
  }

  async handlePaymobCallback(
    transaction: PaymobTransaction,
    receivedHmac: string,
  ) {
    if (!this.paymobService.verifyWebhook(transaction, receivedHmac)) {
      throw new UnauthorizedException('Invalid Paymob webhook signature');
    }

    const payment = await this.paymentModel.findOne({
      providerOrderId: String(transaction.order.id),
      provider: PaymentProvider.PAYMOB,
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    if (
      transaction.amount_cents !== payment.amount * 100 ||
      transaction.currency !== payment.currency
    ) {
      throw new BadRequestException(
        'Payment amount or currency does not match',
      );
    }

    if (transaction.pending) {
      return { message: 'Payment is still pending', status: payment.status };
    }

    if (transaction.is_refunded || transaction.is_voided) {
      return {
        message: 'Refund or void event received',
        status: payment.status,
      };
    }

    const transactionId = String(transaction.id);

    if (payment.status === PaymentStatus.SUCCESSFUL) {
      if (payment.providerTransactionId !== transactionId) {
        throw new ConflictException(
          'Payment has already been completed with another transaction',
        );
      }

      await this.enrollmentsService.enrollAfterPayment(
        payment.course.toString(),
        {
          userId: payment.student.toString(),
          role: UserRole.STUDENT,
        },
      );

      return {
        message: 'Payment was already processed',
        status: PaymentStatus.SUCCESSFUL,
      };
    }

    if (!transaction.success || transaction.error_occured) {
      if (payment.status === PaymentStatus.FAILED) {
        if (payment.providerTransactionId !== transactionId) {
          throw new ConflictException(
            'Payment has already been processed with another transaction',
          );
        }
        return {
          message: 'Failed payment was already processed',
          status: PaymentStatus.FAILED,
        };
      }

      if (payment.status === PaymentStatus.EXPIRED) {
        return {
          message: 'Payment has expired; failed callback ignored',
          status: PaymentStatus.EXPIRED,
        };
      }

      let failedPayment;
      try {
        failedPayment = await this.paymentModel.findOneAndUpdate(
          {
            _id: payment._id,
            status: PaymentStatus.PENDING,
            providerTransactionId: { $in: [null, transactionId] },
          },
          {
            $set: {
              status: PaymentStatus.FAILED,
              providerTransactionId: transactionId,
            },
          },
          { new: true },
        );
      } catch (error) {
        if ((error as { code?: number })?.code === 11000) {
          throw new ConflictException(
            'Paymob transaction is already linked to another payment',
          );
        }
        throw error;
      }

      if (failedPayment) {
        return { message: 'Payment failed', status: failedPayment.status };
      }

      const currentPayment = await this.paymentModel.findById(payment._id);
      if (!currentPayment) {
        throw new NotFoundException('Payment not found');
      }
      if (
        currentPayment.status === PaymentStatus.FAILED &&
        currentPayment.providerTransactionId === transactionId
      ) {
        return {
          message: 'Failed payment was already processed',
          status: currentPayment.status,
        };
      }

      return {
        message: 'Payment state changed before this callback was processed',
        status: currentPayment.status,
      };
    }

    // A verified success is accepted even if our local 30-minute deadline has
    // passed. Provider-confirmed collection takes precedence over local expiry.
    let successfulPayment;
    try {
      successfulPayment = await this.paymentModel.findOneAndUpdate(
        {
          _id: payment._id,
          status: { $in: [PaymentStatus.PENDING, PaymentStatus.EXPIRED] },
          providerTransactionId: { $in: [null, transactionId] },
        },
        {
          $set: {
            status: PaymentStatus.SUCCESSFUL,
            providerTransactionId: transactionId,
          },
        },
        { new: true },
      );
    } catch (error) {
      if ((error as { code?: number })?.code === 11000) {
        throw new ConflictException(
          'Paymob transaction is already linked to another payment',
        );
      }
      throw error;
    }

    if (!successfulPayment) {
      const currentPayment = await this.paymentModel.findById(payment._id);
      if (!currentPayment) {
        throw new NotFoundException('Payment not found');
      }

      if (
        currentPayment.status === PaymentStatus.SUCCESSFUL &&
        currentPayment.providerTransactionId === transactionId
      ) {
        await this.enrollmentsService.enrollAfterPayment(
          currentPayment.course.toString(),
          {
            userId: currentPayment.student.toString(),
            role: UserRole.STUDENT,
          },
        );
        return {
          message: 'Payment was already processed',
          status: currentPayment.status,
        };
      }

      throw new ConflictException(
        'Payment state changed before this successful callback was processed',
      );
    }

    await this.enrollmentsService.enrollAfterPayment(
      successfulPayment.course.toString(),
      {
        userId: successfulPayment.student.toString(),
        role: UserRole.STUDENT,
      },
    );

    return {
      message: 'Payment completed successfully',
      status: successfulPayment.status,
    };
  }

  async findMyPayments(userId: string) {
    if (!userId || !mongoose.isValidObjectId(userId)) {
      throw new BadRequestException('Invalid userId');
    }
    return this.paymentModel
      .find({ student: userId })
      .populate('course')
      .sort({ createdAt: -1 });
  }

  async findOne(paymentId: string, userId: string) {
    if (!userId || !mongoose.isValidObjectId(userId)) {
      throw new BadRequestException('Invalid userId');
    }
    if (!paymentId || !mongoose.isValidObjectId(paymentId)) {
      throw new BadRequestException('Invalid paymentId');
    }

    const payment = await this.paymentModel
      .findOne({
        _id: paymentId,
        student: userId,
      })
      .populate('course');
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    return payment;
  }
}
