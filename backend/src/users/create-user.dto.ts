import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsIn,
  IsOptional,
} from 'class-validator';

import { UserRole } from './user.schema';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email!: string;

  @IsString()
  @IsNotEmpty()
  readonly name!: string;
  @IsString()
  @MinLength(8)
  readonly password!: string;

  @IsIn([UserRole.INSTRUCTOR, UserRole.STUDENT])
  @IsOptional()
  readonly role?: UserRole.INSTRUCTOR | UserRole.STUDENT;
}
