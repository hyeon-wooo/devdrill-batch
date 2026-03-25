import { Injectable } from '@nestjs/common';
import { CommandLogRepository } from './command-log.repository';

@Injectable()
export class CommandLogService {
  constructor(private readonly commandLogRepository: CommandLogRepository) {}

  async getLast7dLogs(): Promise<Record<number, Date[]>> {
    const logs = await this.commandLogRepository.getLast7dLogs();
    return logs.reduce<Record<number, Date[]>>((acc, cur) => {
      if (!acc[cur.commandId]) acc[cur.commandId] = [];
      acc[cur.commandId].push(cur.accessAt);
      return acc;
    }, {});
  }

  async archiveLogs() {
    await this.commandLogRepository.archiveLogs();
  }
}
