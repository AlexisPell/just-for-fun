import { Module } from '@nestjs/common';
import { ConfigModule as _ConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';

@Module({
  imports: [_ConfigModule],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
