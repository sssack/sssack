import type { DataSourceOptions } from 'typeorm';
import type { RedisOptions } from 'ioredis';

export interface JwtConfig {
  accessToken: string;
}

interface AppConfig {
  mysql: DataSourceOptions;
  redis: RedisOptions;
  jwt: JwtConfig;
}

export default (env: Record<string, any> = process.env): AppConfig => ({
  mysql: {
    type: 'mysql',
    port: 3306,
    host: env.MYSQL_HOST,
    username: env.MYSQL_USERNAME,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
  },
  redis: {
    host: env.REDIS_HOST,
    port: 6379,
  },
  jwt: {
    accessToken: env.JWT_ACCESS_TOKEN,
  },
});
