import {
  Injectable,
  BadGatewayException,
  BadRequestException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { createHmac, timingSafeEqual } from 'node:crypto';

export interface CreateIntentionInput {
  paymentId: string;
  amount: number;
  currency: string;
  courseTitle: string;
  billingData: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
}

export interface PaymobIntentionResponse {
  id: string;
  intention_order_id: number;
  client_secret: string;
}

export interface PaymobTransaction {
  amount_cents: number;
  created_at: string;
  currency: string;
  error_occured: boolean;
  has_parent_transaction: boolean;
  id: number;
  integration_id: number;
  is_3d_secure: boolean;
  is_auth: boolean;
  is_capture: boolean;
  is_refunded: boolean;
  is_standalone_payment: boolean;
  is_voided: boolean;
  order: {
    id: number;
  };
  owner: number;
  pending: boolean;
  source_data: {
    pan: string;
    sub_type: string;
    type: string;
  };
  success: boolean;
}

@Injectable()
export class PaymobService {
  private readonly baseUrl = 'https://accept.paymob.com/v1';

  private readonly secretKey: string;
  private readonly publicKey: string;
  private readonly integrationId: number;
  private readonly notificationUrl?: string;
  private readonly hmacSecret: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.secretKey = this.configService.getOrThrow<string>('PAYMOB_SECRET_KEY');

    this.publicKey = this.configService.getOrThrow<string>('PAYMOB_PUBLIC_KEY');

    this.notificationUrl = this.configService.get<string>(
      'PAYMOB_NOTIFICATION_URL',
    );

    this.hmacSecret =
      this.configService.getOrThrow<string>('PAYMOB_HMAC_SECRET');

    this.integrationId = Number(
      this.configService.getOrThrow<string>('PAYMOB_INTEGRATION_ID'),
    );

    if (!Number.isInteger(this.integrationId) || this.integrationId <= 0) {
      throw new Error('Invalid PAYMOB_INTEGRATION_ID');
    }
  }

  // Create a Paymob Intention and return checkout information.
  async createIntention(input: CreateIntentionInput) {
    if (!Number.isInteger(input.amount) || input.amount <= 0) {
      throw new BadRequestException('Invalid payment amount');
    }

    const amountInPiastres = input.amount * 100;

    const requestBody = {
      amount: amountInPiastres,
      currency: input.currency,
      payment_methods: [this.integrationId],

      items: [
        {
          name: input.courseTitle,
          amount: amountInPiastres,
          description: `Payment for course: ${input.courseTitle}`,
          quantity: 1,
        },
      ],

      billing_data: {
        first_name: input.billingData.firstName,
        last_name: input.billingData.lastName,
        email: input.billingData.email,
        phone_number: input.billingData.phoneNumber,

        // Demo billing data: we don't collect addresses in our project.
        apartment: 'NA',
        floor: 'NA',
        street: 'NA',
        building: 'NA',
        shipping_method: 'NA',
        postal_code: 'NA',
        city: 'Cairo',
        state: 'Cairo',
        country: 'EG',
      },

      special_reference: input.paymentId,

      ...(this.notificationUrl
        ? { notification_url: this.notificationUrl }
        : {}),
    };

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const response = await firstValueFrom(
        this.httpService.post<PaymobIntentionResponse>(
          `${this.baseUrl}/intention/`,
          requestBody,
          {
            headers: {
              Authorization: `Token ${this.secretKey}`,
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const { id, intention_order_id, client_secret } = response.data;

      const checkoutUrl = new URL('/unifiedcheckout/', this.baseUrl);

      checkoutUrl.searchParams.set('publicKey', this.publicKey);
      checkoutUrl.searchParams.set('clientSecret', client_secret);

      return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        intentionId: id,
        orderId: String(intention_order_id),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        clientSecret: client_secret,
        checkoutUrl: checkoutUrl.toString(),
      };
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'isAxiosError' in error &&
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        error.isAxiosError === true
      ) {
        throw new BadGatewayException(
          'Failed to create Paymob payment intention',
        );
      }

      throw error;
    }
  }

  // Verify the HMAC signature of a Paymob transaction callback.
  verifyWebhook(transaction: PaymobTransaction, receivedHmac: string): boolean {
    if (
      !transaction ||
      typeof transaction !== 'object' ||
      typeof receivedHmac !== 'string' ||
      !/^[a-fA-F0-9]{128}$/.test(receivedHmac)
    ) {
      return false;
    }
    if (transaction.integration_id !== this.integrationId) {
      return false;
    }

    const sourceData = transaction.source_data;
    const order = transaction.order;

    if (!sourceData || !order) {
      return false;
    }

    const fields = [
      transaction.amount_cents,
      transaction.created_at,
      transaction.currency,
      transaction.error_occured,
      transaction.has_parent_transaction,
      transaction.id,
      transaction.integration_id,
      transaction.is_3d_secure,
      transaction.is_auth,
      transaction.is_capture,
      transaction.is_refunded,
      transaction.is_standalone_payment,
      transaction.is_voided,
      order.id,
      transaction.owner,
      transaction.pending,
      sourceData.pan,
      sourceData.sub_type,
      sourceData.type,
      transaction.success,
    ];

    // All required HMAC fields must be present.
    if (fields.some((field) => field === null || field === undefined)) {
      return false;
    }

    const concatenatedData = fields.map(String).join('');

    const calculatedHmac = createHmac('sha512', this.hmacSecret)
      .update(concatenatedData)
      .digest('hex');

    const calculatedBuffer = Buffer.from(calculatedHmac, 'hex');
    const receivedBuffer = Buffer.from(receivedHmac, 'hex');

    return timingSafeEqual(calculatedBuffer, receivedBuffer);
  }
}
