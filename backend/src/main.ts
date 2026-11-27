import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors({
    origin: configService.getOrThrow<string>('FRONTEND_URL'),
    credentials: true,
  }); // عشان الفرونت يقدر يكلم الباك

  // // --- إعدادات Swagger ---
  // const config = new DocumentBuilder()
  //   .setTitle('E-Learning API')
  //   .setDescription('مستندات وتوثيق الـ REST API لمشروع المنصة التعليمية')
  //   .setVersion('1.0')
  //   .addBearerAuth(
  //     {
  //       type: 'http',
  //       scheme: 'bearer',
  //       bearerFormat: 'JWT',
  //       name: 'JWT',
  //       description: 'أدخل الـ Access Token هنا',
  //       in: 'header',
  //     },
  //     'access-token', // اسم المرجع لاستخدامه في الـ Controllers
  //   )
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api/docs', app, document); // المسار سيكون /api/docs
  // -------------------------

  await app.listen(Number(configService.getOrThrow<string>('PORT')));
}
bootstrap();
