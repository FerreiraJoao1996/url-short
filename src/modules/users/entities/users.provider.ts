import { getModelToken } from '@nestjs/sequelize';
import { UsersEntity } from './users.entity';

export const UsersProvider = [
  {
    provide: getModelToken(UsersEntity),
    useValue: UsersEntity,
  },
];
