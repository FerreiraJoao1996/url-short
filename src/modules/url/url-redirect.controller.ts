import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Res,
} from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { UrlService } from './url.service';
import type { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RedirectUrlSwagger } from './swagger/redirect-url';
import { RedisService } from '../redis/redis.service';

@ApiTags("redirect-url")
@Controller()
export class UrlRedirectController {
  constructor(
    private readonly urlService: UrlService,
    private readonly redisService: RedisService,
    @InjectQueue('clicks') private readonly clickQueue: Queue
  ) { }

  @Get(':short')
  @ApiOperation({ summary: 'Redirecionamento para url original' })
  @RedirectUrlSwagger()
  async redirect(@Param('short') short: string, @Res() res: Response) {
    const cacheKey = `url:${short}`;
    let cachedUrl = await this.redisService.get(cacheKey);

    let url;
    if (cachedUrl) {
      url = JSON.parse(cachedUrl);
    } else {
      url = await this.urlService.findByShortUrl(short);

      if (!url) throw new NotFoundException('A URL não foi encontrada.');

      await this.redisService.set(cacheKey, JSON.stringify(url), 600);
    }

    await this.clickQueue.add('increment', { short: url.short_url });

    return res.redirect(HttpStatus.TEMPORARY_REDIRECT, url.original_url);
  }
}
