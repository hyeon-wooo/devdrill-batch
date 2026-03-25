import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'mysql2/promise';
import { DATABASE_CONNECTION } from 'src/db/db.constant';

@Injectable()
export class CommandLogRepository {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Pool) {}

  async getLast7dLogs(date: Date = new Date()) {
    const sevenDaysAgo = new Date(date);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);
    const sql = `SELECT commandId, accessAt FROM log_command WHERE accessAt >= ?`;
    const [rows] = await this.db.execute(sql, [sevenDaysAgo]);
    return rows as { commandId: number; accessAt: Date }[];
  }

  async archiveLogs(date: Date = new Date()) {
    const sevenDaysAgo = new Date(date);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);
    const sql = `INSERT INTO log_command_archive SELECT * FROM log_command WHERE accessAt < ?`;
    await this.db.execute(sql, [sevenDaysAgo]);

    const sql2 = `DELETE FROM log_command WHERE accessAt < ?`;
    await this.db.execute(sql2, [sevenDaysAgo]);
  }
}
