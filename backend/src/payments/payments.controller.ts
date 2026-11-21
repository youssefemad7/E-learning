import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  Body,
  Query,
  BadRequestException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { UserRole } from '../users/user.schema';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { CreatePaymentDto } from './create-payment.dto';
import type { PaymobTransaction } from './paymob.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // POST	/payments	إنشاء Pyment وطلب Checkout URL	Student
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.STUDENT)
  @Post(':courseId')
  createPayment(
    @Param('courseId') courseId: string,
    @Req() req: { user: { userId: string; email: string; role: UserRole } },
    @Body() createPaymentDto: CreatePaymentDto,
  ) {
    return this.paymentsService.createPayment(
      courseId,
      createPaymentDto,
      req.user,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.STUDENT)
  @Get('my-payments')
  findMyPayments(@Req() req: { user: { userId: string } }) {
    return this.paymentsService.findMyPayments(req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.STUDENT)
  @Get(':paymentId')
  findOne(
    @Param('paymentId') paymentId: string,
    @Req() req: { user: { userId: string } },
  ) {
    return this.paymentsService.findOne(paymentId, req.user.userId);
  }

  @Post('paymob/callback')
  @HttpCode(HttpStatus.OK)
  async handlePaymobCallback(
    @Body()
    body: {
      type: string;
      obj: PaymobTransaction;
    },
    @Query('hmac') hmac: string,
  ) {
    if (!body || body.type !== 'TRANSACTION' || !body.obj) {
      throw new BadRequestException('Invalid Paymob callback payload');
    }

    if (!hmac || typeof hmac !== 'string') {
      throw new BadRequestException('Missing or invalid Paymob HMAC');
    }

    return this.paymentsService.handlePaymobCallback(body.obj, hmac);
  }
}
