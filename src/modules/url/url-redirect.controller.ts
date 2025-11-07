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

@Controller()
export class UrlRedirectController {
  constructor(
    private readonly urlService: UrlService,
    @InjectQueue('clicks') private readonly clickQueue: Queue
  ) { }

  @Get(':short')
  async redirect(@Param('short') short: string, @Res() res: Response) {
    const url = await this.urlService.findByShortUrl(short);
    if (!url) throw new NotFoundException('A URL não foi encontrada.');

    await this.clickQueue.add('increment', { short: url.short_url });

    return res.redirect(HttpStatus.TEMPORARY_REDIRECT, url.original_url);
  }
}
