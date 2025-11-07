import { ConfigModule, ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { UsersEntity } from 'src/modules/users/entities/users.entity';


export const Mysql = [
  {
    provide: 'urlshort',
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        logging: false,
        omitNull: true,
        models: [UsersEntity],
      });

      await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService],
  },
];
