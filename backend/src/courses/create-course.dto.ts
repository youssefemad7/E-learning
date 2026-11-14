import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsNumber,
  Min,
  IsEnum,
  IsArray,
  ArrayNotEmpty,
  IsUrl,
  IsMongoId,
  Matches,
} from 'class-validator';
import { CourseLevel } from './course.schema';

export class CreateCourseDto {
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @Matches(/\S/)
  title!: string;

  @IsString()
  @MinLength(16)
  @IsNotEmpty()
  @Matches(/\S/)
  description!: string;

  @IsUrl()
  @IsNotEmpty()
  thumbnail!: string;

  @IsNumber()
  @Min(0, { message: 'Price must be a non-negative number' })
  price!: number;

  @IsEnum(CourseLevel, {
    message: 'Level must be a valid course level',
  })
  @IsNotEmpty()
  level!: CourseLevel;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @Matches(/\S/, {
    each: true,
    message:
      'Each requirement must contain at least one non-whitespace character',
  })
  requirements!: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @Matches(/\S/, {
    each: true,
    message:
      'Each learning outcome must contain at least one non-whitespace character',
  })
  learningOutcomes!: string[];

  @IsMongoId()
  @IsNotEmpty()
  category!: string;
}
