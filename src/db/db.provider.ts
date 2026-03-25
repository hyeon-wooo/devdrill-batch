// database.provider.ts
import * as mysql from 'mysql2/promise';
import { DATABASE_CONNECTION } from './db.constant';
import { ConfigService } from '@nestjs/config';

export const databaseProvider = {
  provide: DATABASE_CONNECTION,
  useFactory: async (configService: ConfigService) => {
    return mysql.createPool({
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      user: configService.get('DB_USER'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
    });
  },
  inject: [ConfigService],
};
