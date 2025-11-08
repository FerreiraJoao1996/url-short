import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UrlEntity } from './entities/url.entity';
import { Sequelize } from 'sequelize';
import { UrlDTO } from './dto/created-url';

@Injectable()
export class UrlService {
  constructor(@Inject('urlshort') private readonly sequelize: Sequelize) { }

  async create(originaUrl: string, userId: number, alias: string = ''): Promise<UrlDTO> {
    let shortUrl: string = alias;

    if (!shortUrl) {
      shortUrl = await this.generateUniqueShortCode();
    } else {
      const exists = await this.findByShortUrl(shortUrl);
      if (exists) throw new ForbiddenException('Este alias já está em uso!');
    }

    const url = await UrlEntity.create({
      original_url: originaUrl,
      short_url: shortUrl,
      user_id: userId,
    });

    return {
      id: url.dataValues.id,
      original_url: url.dataValues.original_url,
      short_url: url.dataValues.short_url,
      user_id: url.dataValues.user_id,
      number_clicks: url.dataValues.number_clicks,
    }

  }

  public validShortUrl(alias: string): boolean {
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

  private async generateUniqueShortCode(length = 6): Promise<string> {
    let shortCode: string;
    let exists: UrlEntity | null;

    do {
      shortCode = this.generateShortCode(length);
      exists = await this.findByShortUrl(shortCode);
    } while (exists);

    return shortCode;
  }

  public async findByShortUrl(shortUrl: string): Promise<UrlEntity | null> {
    return await UrlEntity.findOne({
      where: { short_url: shortUrl },
      raw: true,
    });
  }

  async update(oldShortUrl: string, url: UrlEntity) {
    await UrlEntity.update(
      {
        short_url: url.short_url,
        original_url: url.original_url
      },
      { where: { short_url: oldShortUrl } },
    );

    const newUrl = await this.findByShortUrl(url.short_url)

    if (!newUrl) return []

    return {
      id: newUrl.id,
      original_url: newUrl.original_url,
      short_url: newUrl.short_url,
      user_id: newUrl.user_id,
      number_clicks: newUrl.number_clicks,
    }

  }


  async get(userId: number) {
    return await UrlEntity.findAll({
      where: {
        user_id: userId
      },
      attributes: ['original_url', 'short_url', 'number_clicks']
    }) ?? [];

  }

  async delete(url: string, userId: number) {
    const shortUrl = await UrlEntity.findOne({
      where: {
        short_url: url,
      },
    });

    if (!shortUrl) {
      throw new NotFoundException(
        'URL inválida ou não existe!',
      );
    }

    if (shortUrl.user_id !== userId) {
      throw new ForbiddenException("Você não possui permissão para deletar esta url.")
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
