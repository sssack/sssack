import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

@Injectable()
export class ConfigsService {
  constructor(private readonly configService: NestConfigService) {}

  isProduction() {
    return this.configService.get('NODE_ENV') === 'production';
  }

  isDevelopment() {
    return this.configService.get('NODE_ENV') === 'development';
  }

  isLocal() {
    return this.configService.get('NODE_ENV') === 'local';
  }

  get mysql(): DataSourceOptions {
    return this.configService.get<DataSourceOptions>('mysql')!;
  }
}
