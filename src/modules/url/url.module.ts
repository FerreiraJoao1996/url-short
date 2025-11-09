import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { UrlProvider } from './entities/url.provider';
import { UsersProvider } from '../users/entities/users.provider';
import { UrlRedirectController } from './url-redirect.controller';
import { UrlProcessor } from './url.processor';
import { BullModule } from '@nestjs/bullmq';
import { AuthModule } from '../auth/auth.module';
import { redisConfig } from '../../queues/bull.config';
import { Mysql } from '../../database/mysql';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [
    AuthModule,
    redisConfig,
    ConfigModule,
    BullModule.registerQueue({ name: 'clicks' }),
    RedisModule
  ],
  controllers: [UrlController, UrlRedirectController],
  providers: [UrlService, ...UrlProvider, ...UsersProvider, UrlProcessor, ...Mysql],
  exports: [UrlService, ...UrlProvider],
})
export class UrlModule { }
