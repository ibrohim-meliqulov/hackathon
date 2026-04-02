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
    origin: ["http://localhost:5176", "https://ais-dev-yfyhnyeidmox5rj3ijh6uh-443022657534.asia-southeast1.run.app/", "https://hackathon-front-7t48.onrender.com/"],
    credentials: true,
  });


  app.use(json({ limit: "50mb" }))
  app.use(urlencoded({ extended: true, limit: "50mb" }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
