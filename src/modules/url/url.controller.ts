import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { User } from '../auth/decorators/user';
import { UsersEntity } from '../users/entities/users.entity';
import type { Request } from "express";
import { CreateUrlDTO } from './dto/create-url';
import { OptionalAuthenticated } from '../auth/decorators/optional-authenticated';
import { hasHttpPrefix } from '../../utils/has-http-prefix';
import { formatShortUrl } from '../../utils/format-short-url';
import { UrlEntity } from './entities/url.entity';
import { Logged } from '../auth/decorators/logged';
import { UpdateUrlDTO } from './dto/update-url';
import { CONSTANTS } from '../../utils/constants';

@Controller('url')
export class UrlController {
  constructor(
    private readonly urlService: UrlService
  ) { }

  @Post('/')
  @OptionalAuthenticated()
  async create(@Body() body: CreateUrlDTO, @User() user: UsersEntity | undefined, @Req() request: Request) {
    let url: UrlEntity;
    const validUrl = hasHttpPrefix(body.url)

    if (!validUrl) {
      throw new BadRequestException("A url informada não é valida.")
    }

    if (body.shortUrl) {
      const hasReservedName = [CONSTANTS.MODULES.AUTH, CONSTANTS.MODULES.URL, CONSTANTS.MODULES.USERS].includes(body.shortUrl)
      const hasShortUrl = await this.urlService.findByShortUrl(body.shortUrl)
      if (!this.urlService.validShortUrl(body.shortUrl) || hasReservedName || hasShortUrl) {
        throw new BadRequestException("A url encurtada não é valida ou já existe.");
      }

      const shortUrl = formatShortUrl(body.shortUrl);

      url = await this.urlService.create(
        body.url,
        user?.id,
        shortUrl,
      );
    } else {
      url = await this.urlService.create(
        body.url,
        user?.id
      );
    }

    return {
      url: url,
      shortenedUrl: `${request.protocol}://${request.headers.host}/${url.short_url}`
    };
  }

  @Logged()
  @Put('/')
  async update(@Body() body: UpdateUrlDTO, @User() user: UsersEntity) {
    const url = await this.urlService.findByShortUrl(body.shortUrl);

    if (!url) {
      throw new NotFoundException("A url encurtada informada não foi encontrada.");
    }

    if (url?.user_id !== user.id) {
      throw new ForbiddenException(
        "Você não possui permissão para editar esta url!"
      );
    }

    if (!body.newShortUrl && !body.url) {
      return { url };
    }

    if (body.newShortUrl !== undefined) {
      const hasReservedName = [CONSTANTS.MODULES.AUTH, CONSTANTS.MODULES.URL, CONSTANTS.MODULES.USERS].includes(body.shortUrl)
      const hasShortUrl = await this.urlService.findByShortUrl(body.shortUrl)

      if (!this.urlService.validShortUrl(body.shortUrl) || hasReservedName || hasShortUrl) {
        throw new BadRequestException("A url encurtada não é valida.");
      }

      url.short_url = formatShortUrl(body.newShortUrl);
    }

    if (body.url) {

      const validUrl = hasHttpPrefix(body.url)

      if (!validUrl) {
        throw new BadRequestException("A url informada não é valida.")
      }

      url.original_url = body.url;
    }

    await this.urlService.update(body.shortUrl, url);

    return { url };
  }

  @Logged()
  @Get('list')
  async get(@User() user: UsersEntity) {
    return await this.urlService.get(Number(user.id));
  }

  @Logged()
  @Delete('/:shortUrl')
  async delete(@Param("shortUrl") shortUrl: string, @User() user: UsersEntity) {
    return await this.urlService.delete(
      shortUrl,
      user.id
    );
  }
}
