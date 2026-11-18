import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type LessonDocument = HydratedDocument<Lesson>;

@Schema({ timestamps: true })
export class Lesson {
  @Prop({ required: true, trim: true })
  title!: string;

  @Prop({ required: true, trim: true })
  description!: string;

  @Prop({ required: true, trim: true })
  videoUrl!: string;

  @Prop({ required: true, min: 0 })
  duration!: number;

  @Prop({ required: true, default: false })
  isPreview!: boolean;

  @Prop({
    type: Types.ObjectId,
    ref: 'Course',
    required: true,
  })
  course!: Types.ObjectId;

  @Prop({ required: true, trim: true, lowercase: true })
  section!: string;

  @Prop({ required: true, min: 1 })
  sectionOrder!: number;

  @Prop({ required: true, min: 1 })
  lessonOrder!: number;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
