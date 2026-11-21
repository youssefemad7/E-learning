import mongoose, { Model } from 'mongoose';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Payment, PaymentProvider, PaymentStatus } from './payment.schema';
import { EnrollmentsService } from '../enrollments/enrollments.service';
import { PaymobService, PaymobTransaction } from './paymob.service';
import { UserRole } from '../users/user.schema';
import { Course, CourseStatus } from '../courses/course.schema';
import { CreatePaymentDto } from './create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
    @InjectModel(Course.name) private courseModel: Model<Course>,
    private paymobService: PaymobService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  // Validate the student and course.
  // Prevent payment for free or unpublished courses.
  // Check for an existing active enrollment.
  // Create a pending Payment using the current course price.
  // Request a Paymob Intention.
  // Save the Paymob references and return checkout information.
  async createPayment(
    courseId: string,
    createPaymentDto: CreatePaymentDto,
    user: { userId: string; email: string; role: UserRole },
  ) {
    //1.Validate the student and course.
    if (user.role !== UserRole.STUDENT) {
      throw new ForbiddenException(
        "You are not allowed to enroll this course because You aren't student",
      );
    }
    // 2. Verify that the course exists.
    if (!courseId || !mongoose.isValidObjectId(courseId)) {
      throw new BadRequestException('Invalid Course ID');
    }

    const course = await this.courseModel.findById(courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // 3. Verify that the course is published.
    if (course.status !== CourseStatus.PUBLISHED) {
      throw new ForbiddenException(
        "You are not allowed to enroll this course because course isn't published",
      );
    }
    // 4. Verify that the course is free.
    if (course.price === 0) {
      throw new BadRequestException('This course is free');
    }
    //5. Check for an existing active enrollment
    const enrollment = await this.enrollmentsService.checkEnrollment(
      courseId,
      user.userId,
    );
    if (enrollment) {
      throw new ForbiddenException(
        'You are not allowed to enroll this course because you are already enroll it',
      );
    }

    //6. Create a pending Payment using the current course price.
    const payment = new this.paymentModel({
      course: courseId,
      student: user.userId,
      amount: course.price,
      currency: 'EGP',
      status: PaymentStatus.PENDING,
    });
    await payment.save();
    //7. Request a Paymob Intention.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
    //8. Save the Paymob references and return checkout information.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    payment.intentionId = intentionId;
    payment.providerOrderId = orderId;
    await payment.save();
    return {
      paymentId: payment._id,
      status: payment.status,
      checkoutUrl,
    };
  }

  // Verify and process the Paymob callback.
  // Match the callback with the correct Payment.
  // Verify payment amount, currency and transaction details.
  // Prevent duplicate processing.
  // Update the Payment status.
  // Create or reactivate Enrollment after confirmed success.
  async handlePaymobCallback(
    transaction: PaymobTransaction,
    receivedHmac: string,
  ) {
    // 1. Verify callback authenticity.
    const isValid = this.paymobService.verifyWebhook(transaction, receivedHmac);

    if (!isValid) {
      throw new UnauthorizedException('Invalid Paymob webhook signature');
    }

    // 2. Find the payment using Paymob's order ID.
    const payment = await this.paymentModel.findOne({
      providerOrderId: String(transaction.order.id),
      provider: PaymentProvider.PAYMOB,
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    // 3. Verify payment amount and currency.
    if (
      transaction.amount_cents !== payment.amount * 100 ||
      transaction.currency !== payment.currency
    ) {
      throw new BadRequestException(
        'Payment amount or currency does not match',
      );
    }

    // 4. Ignore pending transactions.
    if (transaction.pending) {
      return {
        message: 'Payment is still pending',
        status: payment.status,
      };
    }

    // 5. Ignore refund and void events for now.
    if (transaction.is_refunded || transaction.is_voided) {
      return {
        message: 'Refund or void event received',
        status: payment.status,
      };
    }

    const transactionId = String(transaction.id);

    // 6. Handle duplicate successful callbacks.
    if (
      payment.status === PaymentStatus.SUCCESSFUL &&
      payment.providerTransactionId === transactionId
    ) {
      // Retry enrollment in case the previous attempt failed.
      await this.enrollmentsService.enrollAfterPayment(
        payment.course.toString(),
        {
          userId: payment.student.toString(),
          role: UserRole.STUDENT,
        },
      );

      return {
        message: 'Payment was already processed',
        status: payment.status,
      };
    }

    if (payment.status === PaymentStatus.SUCCESSFUL) {
      throw new ConflictException(
        'Payment has already been completed with another transaction',
      );
    }

    // 7. Handle duplicate failed callbacks.
    if (
      payment.status === PaymentStatus.FAILED &&
      payment.providerTransactionId === transactionId
    ) {
      return {
        message: 'Failed payment was already processed',
        status: payment.status,
      };
    }

    // 8. Handle failed transactions.
    if (!transaction.success || transaction.error_occured) {
      payment.status = PaymentStatus.FAILED;
      payment.providerTransactionId = transactionId;

      await payment.save();

      return {
        message: 'Payment failed',
        status: payment.status,
      };
    }

    // 9. Mark payment as successful.
    payment.status = PaymentStatus.SUCCESSFUL;
    payment.providerTransactionId = transactionId;

    await payment.save();

    // 10. Enroll the student in the course.
    await this.enrollmentsService.enrollAfterPayment(
      payment.course.toString(),
      {
        userId: payment.student.toString(),
        role: UserRole.STUDENT,
      },
    );

    return {
      message: 'Payment completed successfully',
      status: payment.status,
    };
  }

  // Return the current student's payment history.
  async findMyPayments(userId: string) {
    // Validate the student ID.
    if (!userId || !mongoose.isValidObjectId(userId)) {
      throw new BadRequestException('Invalid userId');
    }
    return this.paymentModel
      .find({ student: userId })
      .populate('course')
      .sort({ createdAt: -1 });
  }

  // Find a specific payment belonging to the current student.
  async findOne(paymentId: string, userId: string) {
    // Validate the student ID.
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
