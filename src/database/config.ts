import * as dotenv from 'dotenv';
import path from 'node:path';
dotenv.config();
  
export default {
  development: {
    dialect: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    migrationsPath: path.resolve(__dirname, '../src/database/migrations'),
  },
};
