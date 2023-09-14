import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentConfigModule } from './environment-config/environment-config.module';
import { MysqlConfigService } from './environment-config/mysql-config.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    EnvironmentConfigModule,
    UserModule,
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      useFactory: (mySsqlConfigService: MysqlConfigService) =>
        mySsqlConfigService.databaseConnectionConfig,
      inject: [MysqlConfigService],
    }),
  ],
})
export class AppModule {}
