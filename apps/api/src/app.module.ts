import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentConfigModule } from './environment-config/environment-config.module';
import { MysqlConfigService } from './environment-config/mysql-config.service';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    EnvironmentConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      useFactory: (mySqlConfigService: MysqlConfigService) =>
        mySqlConfigService.databaseConnectionConfig,
      inject: [MysqlConfigService],
    }),
    TodoModule,
  ],
})
export class AppModule {}
