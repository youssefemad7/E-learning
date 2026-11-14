// PartialType creates an update DTO by inheriting all properties
// and validation rules from CreateCategoryDto while making
// every property optional.
import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

//Old Code
// import {
//   IsString,
//   IsNotEmpty,
//   MinLength,
//   IsMongoId,
//   IsOptional,
//   IsUrl,
// } from 'class-validator';

// export class UpdateCategoryDto {
//   @IsString()
//   @IsNotEmpty()
//   @IsOptional()
//   name?: string;

//   @IsString()
//   @MinLength(16)
//   @IsNotEmpty()
//   @IsOptional()
//   description?: string;

//   @IsUrl()
//   @IsOptional()
//   image?: string | null;

//   @IsOptional()
//   @IsMongoId()
//   parentCategory?: string | null;
// }
