import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export enum CourseLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export enum CourseStatus {
  DRAFT = 'draft',
  PENDING_REVIEW = 'pending_review',
  PUBLISHED = 'published',
  REJECTED = 'rejected',
  UNPUBLISHED = 'unpublished',
}

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true, trim: true })
  title!: string;
  @Prop({ required: true, trim: true })
  normalizedTitle!: string;

  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  slug!: string;

  @Prop({ required: true, trim: true })
  description!: string;

  @Prop({ required: true, trim: true })
  thumbnail!: string;

  @Prop({ required: true, min: 0 })
  price!: number;

  @Prop({
    type: Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  category!: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  instructor!: Types.ObjectId;

  @Prop({
    type: String,
    enum: CourseLevel,
    required: true,
  })
  level!: CourseLevel;

  @Prop({ type: [String], default: [] })
  requirements!: string[];

  @Prop({ type: [String], default: [] })
  learningOutcomes!: string[];

  @Prop({
    type: String,
    enum: CourseStatus,
    default: CourseStatus.DRAFT,
  })
  status!: CourseStatus;

  @Prop({ type: String, default: null })
  rejectionReason!: string | null;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
