import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from '@libs/logger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { getFirstErrorMessage } from '@libs/utils';

(async () => {
  const app = await NestFactory.create(AppModule, { logger });

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const firstErrorMessage = getFirstErrorMessage(errors[0]);
        throw new BadRequestException(firstErrorMessage);
      },
    })
  );
  app.enableShutdownHooks();

  await app.listen(3000, () => {
    logger.log('server is running on 3000 port. 🚀');
  });
})();
