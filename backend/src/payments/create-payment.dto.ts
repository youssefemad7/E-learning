import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName!: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName!: string;

  @IsNotEmpty()
  @IsPhoneNumber('EG')
  readonly phoneNumber!: string;
}
