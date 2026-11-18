import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export enum EnrollmentStatus {
  ACTIVE = 'active',
  CANCELLED = 'cancelled',
}
export type EnrollmentDocument = HydratedDocument<Enrollment>;
@Schema({ timestamps: true })
export class Enrollment {
  @Prop({
    type: Types.ObjectId,
    ref: 'Course',
    required: true,
  })
  course!: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  student!: Types.ObjectId;

  @Prop({
    type: String,
    enum: EnrollmentStatus,
    required: true,
    default: EnrollmentStatus.ACTIVE,
  })
  status!: EnrollmentStatus;

  @Prop({ type: Date, default: Date.now })
  enrolledAt!: Date;

  @Prop({ type: Date, default: null })
  cancelledAt!: Date | null;
}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);
EnrollmentSchema.index({ student: 1, course: 1 }, { unique: true });
