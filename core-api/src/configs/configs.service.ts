import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import type { DataSourceOptions } from 'typeorm';
import type { RedisOptions } from 'ioredis';
import type { JwtConfig } from './configuration';

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

  get redis(): RedisOptions {
    return this.configService.get<RedisOptions>('redis')!;
  }

  get jwt() {
    return this.configService.get<JwtConfig>('jwt')!;
  }
}
