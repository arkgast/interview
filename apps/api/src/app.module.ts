import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentConfigModule } from './environment-config/environment-config.module';
import { MysqlConfigService } from './environment-config/mysql-config.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      useFactory: (mySsqlConfigService: MysqlConfigService) =>
        mySsqlConfigService.databaseConnectionConfig,
      inject: [MysqlConfigService],
    }),
  ],
})
export class AppModule {}
