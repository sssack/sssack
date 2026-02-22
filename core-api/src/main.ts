import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from '@libs/logger';
import { customValidationPipe } from '@libs/pipes';

(async () => {
  const app = await NestFactory.create(AppModule, { logger });

  app.enableCors();

  app.useGlobalPipes(customValidationPipe);

  // NOTE: graceful shutdown을 위한 설정
  app.enableShutdownHooks();

  await app.listen(3000, () => {
    logger.log('server is running on 3000 port. 🚀');
  });
})();
