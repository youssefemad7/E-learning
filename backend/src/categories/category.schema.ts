import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true, trim: true })
  name: string;
  @Prop({ required: true, trim: true })
  normalizedName: string;

  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  slug: string;

  @Prop({ required: true, trim: true })
  description: string;

  @Prop()
  image: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Category',
    default: null,
  })
  parentCategory: Types.ObjectId | null;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
CategorySchema.index(
  { normalizedName: 1, parentCategory: 1 },
  { unique: true },
);
