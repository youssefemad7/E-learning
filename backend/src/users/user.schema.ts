import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum UserRole {
  STUDENT = 'student',
  INSTRUCTOR = 'instructor',
  ADMIN = 'admin',
}
export type UserDocument = HydratedDocument<User>;
@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ enum: UserRole, default: 'student' })
  role!: UserRole;
  @Prop({ type: String, default: null })
  refreshToken!: string | null; // ✅ هنحتاجه في الـ Auth
  _id: any;
  toObject: any;
}

export const UserSchema = SchemaFactory.createForClass(User);
