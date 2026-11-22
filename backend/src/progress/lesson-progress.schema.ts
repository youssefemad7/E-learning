import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type LessonProgressDocument = HydratedDocument<LessonProgress>;

@Schema({ timestamps: true })
export class LessonProgress {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  student!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  course!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Lesson', required: true })
  lesson!: Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  isCompleted!: boolean;

  @Prop({ type: Date, default: null })
  completedAt!: Date | null;

  // Mongoose automatically manages these fields because timestamps is enabled.
  declare createdAt: Date;
  declare updatedAt: Date;
}

export const LessonProgressSchema =
  SchemaFactory.createForClass(LessonProgress);

LessonProgressSchema.index({ student: 1, course: 1 });
LessonProgressSchema.index({ student: 1, lesson: 1 }, { unique: true });
