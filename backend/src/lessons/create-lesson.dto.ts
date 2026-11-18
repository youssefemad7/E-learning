import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsNumber,
  Min,
  IsUrl,
  Matches,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateLessonDto {
  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  @Matches(/\S/)
  title!: string;

  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  @Matches(/\S/)
  description!: string;

  @IsUrl()
  @IsNotEmpty()
  videoUrl!: string;

  @IsNumber()
  @Min(0, { message: 'Duration must be a non-negative number' })
  duration!: number;

  @IsBoolean()
  @IsOptional()
  isPreview?: boolean;

  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  @Matches(/\S/)
  section!: string;
}
