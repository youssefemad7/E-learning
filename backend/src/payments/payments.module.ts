import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentsService } from './payments.service';
import { PaymobService } from './paymob.service';
import { PaymentsController } from './payments.controller';
import { EnrollmentsModule } from '../enrollments/enrollments.module';
import { Payment, PaymentSchema } from './payment.schema';
import { Course, CourseSchema } from '../courses/course.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Payment.name, schema: PaymentSchema },
      { name: Course.name, schema: CourseSchema },
    ]),
    EnrollmentsModule,
    HttpModule,
  ],
  providers: [PaymentsService, PaymobService],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
