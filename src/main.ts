import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import "reflect-metadata"
import cookieParser from 'cookie-parser';
import { CheckCookieMiddleware } from './auth/middlewares/check-cookie.middleware';
import { AuthService } from './auth/auth.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )

  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true
  })

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
