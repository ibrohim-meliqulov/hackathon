import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }))

  app.enableCors({
    origin: 'http://localhost:5176',
    credentials: true,
  });


  app.use(json({ limit: "50mb" }))
  app.use(urlencoded({ extended: true, limit: "50mb" }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
