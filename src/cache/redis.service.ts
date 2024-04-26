import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { AuthService } from '../auth/auth.service';
import { env } from 'process';
import { EmailService } from '../email/email.service';
@Injectable()
export class RedisService {
  constructor(
    private readonly authService: AuthService,
    private readonly sendMail: EmailService,
  ) {}

  private RedisDefault = new Redis({
    host: `${env.REDIS_HOST}`,
    port: 6379,
    retryStrategy: (times: number) => {
      return Math.min(times * 2, 2000000000);
    },
  });

  private RedisSubscriber = new Redis({
    host: `${env.REDIS_HOST}`,
    port: 6379,
    retryStrategy: (times: number) => {
      return Math.min(times * 2, 2000000000);
    },
  });

  private getRedis(): Redis {
    return this.RedisDefault;
  }

  private getRedisSubscriber(): Redis {
    return this.RedisSubscriber;
  }

  public async get(key: string) {
    return await this.getRedis().get(key);
  }

  public async redisSubscribe(key: string) {
    return await this.getRedisSubscriber().subscribe(key);
  }
  
}
