import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

import { server } from 'config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(server.port);
}
bootstrap();
