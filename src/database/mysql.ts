import { ConfigModule, ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';


export const Mysql = [
  {
    provide: 'urlshort',
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: configService.get<string>('DB_TYPE') as any,
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        logging: false,
        omitNull: true,
        models: [],
      });

      await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService],
  },
];
