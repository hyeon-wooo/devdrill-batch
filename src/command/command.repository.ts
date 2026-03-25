import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'mysql2/promise';
import { DATABASE_CONNECTION } from 'src/db/db.constant';

@Injectable()
export class CommandRepository {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Pool) {}

  async updateTtlById(id: number, ttl: number) {
    const sql = `UPDATE linux_command SET ttl = ? WHERE id = ?`;
    await this.db.query(sql, [ttl, id]);
    return true;
  }
}
