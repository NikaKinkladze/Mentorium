import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Strips unknown fields and rejects requests that fail DTO validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors(); // tighten to the real frontend origin(s) before production

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`Mentorium API running on http://localhost:${port}`);
}
bootstrap();
