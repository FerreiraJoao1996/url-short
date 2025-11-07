import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UrlEntity } from './entities/url.entity';
import { Sequelize } from 'sequelize';

@Injectable()
export class UrlService {
  constructor(@Inject('urlshort') private readonly sequelize: Sequelize) { }

  async create(originaUrl: string, userId: number, alias: string = ''): Promise<UrlEntity> {
    try {
      let shortUrl: string = alias;
      if (!alias.trim()) {
        shortUrl = this.generateShortCode();
      }

      const url = await UrlEntity.create({
        original_url: originaUrl,
        short_url: shortUrl,
        user_id: userId,
      });

      return url

    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  public validShortUrl(alias: string) {
    return !/[^a-zA-Z0-9 -]/.test(alias);
  }

  public generateShortCode(length = 6): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }

    return result;
  }

  public async findByShortUrl(shortUrl: string): Promise<UrlEntity | null> {
    return await UrlEntity.findOne({
      where: { short_url: shortUrl },
      raw: true,
    });
  }

  async update(oldShortUrl: string, url: UrlEntity) {
    try {
      return await UrlEntity.update(
        {
          short_url: url.short_url,
          original_url: url.original_url
        },
        { where: { short_url: oldShortUrl } },
      );
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }


  async get(userId: number) {
    try {
      return await UrlEntity.findAll({
        where: {
          user_id: userId
        },
        attributes: ['original_url', 'short_url', 'number_clicks']
      }) ?? [];
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(url: string, userId: number) {
    const shortUrl = await UrlEntity.findOne({
      where: {
        short_url: url,
        user_id: userId,
      },
    });

    if (!shortUrl) {
      throw new NotFoundException(
        'URL inválida ou não existe!',
      );
    }

    const response = await UrlEntity.update(
      {
        deletedAt: new Date(),
      },
      { where: { short_url: url } },

    );

    return response[0] === 1;
  }

  async incrementClickCount(shortUrl: string): Promise<void> {
    const Url = this.sequelize.model('UrlEntity') as typeof UrlEntity;
    await Url.increment('number_clicks', { where: { short_url: shortUrl } });
  }
}
