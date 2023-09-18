import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { flatRequire } from './flat-require';

@Injectable()
export class MysqlConfigService {
  constructor(private configService: ConfigService) {}

  get databaseConnectionConfig(): DataSourceOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('MYSQL_HOST'),
      port: this.configService.get<number>('MYSQL_PORT'),
      username: this.configService.get<string>('MYSQL_USER'),
      password: this.configService.get<string>('MYSQL_PASSWORD'),
      database: this.configService.get<string>('MYSQL_DATABASE'),
      entities: flatRequire(require['context']('../', true, /\.entity\.ts$/)),
      synchronize: true,
    };
  }
}
