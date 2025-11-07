import { getModelToken } from '@nestjs/sequelize';
import { UrlEntity } from './url.entity';

export const UrlProvider = [
  {
    provide: getModelToken(UrlEntity),
    useValue: UrlEntity,
  },
];
