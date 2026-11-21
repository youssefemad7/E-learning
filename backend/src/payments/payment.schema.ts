import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export enum PaymentStatus {
  PENDING = 'pending',
  SUCCESSFUL = 'successful',
  FAILED = 'failed',
}
export enum PaymentProvider {
  PAYMOB = 'paymob',
}

export type PaymentDocument = HydratedDocument<Payment>;
@Schema({ timestamps: true })
export class Payment {
  @Prop({ required: true, min: 1, validate: Number.isInteger })
  amount!: number;

  @Prop({ required: true, default: 'EGP' })
  currency!: string;

  @Prop()
  providerOrderId?: string;

  @Prop()
  providerTransactionId?: string;

  @Prop()
  intentionId?: string;

  @Prop({
    type: String,
    enum: PaymentProvider,
    required: true,
    default: PaymentProvider.PAYMOB,
  })
  provider!: PaymentProvider;

  @Prop({
    type: String,
    enum: PaymentStatus,
    required: true,
    default: PaymentStatus.PENDING,
  })
  status!: PaymentStatus;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  course!: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  student!: Types.ObjectId;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);

PaymentSchema.index({ providerOrderId: 1 }, { unique: true, sparse: true });

PaymentSchema.index(
  { providerTransactionId: 1 },
  { unique: true, sparse: true },
);

PaymentSchema.index({ student: 1, createdAt: -1 });
