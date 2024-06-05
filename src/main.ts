import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './config/exceptionsFilter';
import { HttpAdapterHost } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { instance } from './config/logger/winston.logger';

// {
//   logger: WinstonModule.createLogger({
//     instance: instance,
//   })
// }
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  await app.listen(3000);
}

bootstrap();
