import { Logger, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigsService } from '@configs';
import entities from './entities';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigsService],
      useFactory: (configsService: ConfigsService) => ({
        ...configsService.mysql,
        entities,
        synchronize: true,
      }),
    }),
  ],
})
export class DatabasesModule implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger();

  constructor(private readonly dataSource: DataSource) {}

  onModuleInit() {
    if (this.dataSource.isInitialized) {
      this.logger.log('Database connection established. 🚀');
    }
  }

  onModuleDestroy() {
    if (this.dataSource.isInitialized) {
      this.logger.log('Database connection closed. 🚀');
    }
  }
}
