import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MysqlConfigService } from './mysql-config.service';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [MysqlConfigService],
  exports: [MysqlConfigService],
})
export class EnvironmentConfigModule {}
