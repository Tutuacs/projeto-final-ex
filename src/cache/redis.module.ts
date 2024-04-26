import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { AuthModule } from '../auth/auth.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [AuthModule, EmailModule],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
