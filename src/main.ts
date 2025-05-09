import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import admin from 'firebase.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 8080, '0.0.0.0');

}
bootstrap();
