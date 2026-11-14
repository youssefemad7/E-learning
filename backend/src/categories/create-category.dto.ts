import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsMongoId,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @MinLength(16)
  @IsNotEmpty()
  description?: string;

  @IsUrl()
  @IsOptional()
  image?: string | null;

  @IsOptional()
  @IsMongoId()
  parentCategory?: string | null;
}
