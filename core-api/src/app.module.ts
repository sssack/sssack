import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HealthController } from './health.controller';
import { CommonModule } from '@common/common.module';
import { RequestLoggerInterceptor } from '@libs/interceptors';
import { ConfigsModule } from '@configs';
import { DatabasesModule } from '@databases';
import { ContextMiddleware, UUIDMiddleware } from '@middlewares';

@Module({
  imports: [CommonModule, ConfigsModule, DatabasesModule],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggerInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleware, UUIDMiddleware).forRoutes('*');
  }
}
