import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { CommandService } from 'src/command/command.service';
import { CommandLogService } from 'src/log/command-log/command-log.service';

@Injectable()
export class BatchService {
  private logger = new Logger(BatchService.name);

  constructor(
    private readonly commandService: CommandService,
    private readonly commandLogService: CommandLogService,
  ) {}

  // 최근 7일간의 명령어 조회 이력을 토대로 P90 TTL 계산+갱신. 2026-03-26 01:00:00 실행 시, 0319 00:00:00 ~ 0325 23:59:59.
  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async calcTtl() {
    this.logger.log(`[calcTtl] started`);
    const logs = await this.commandLogService.getLast7dLogs();

    const entries = Object.entries(logs);
    for (const entry of entries) {
      const commandId = Number(entry[0]);
      const timeList = entry[1].sort((a, b) => a.getTime() - b.getTime());
      if (timeList.length < 2) continue;

      const diffList: number[] = [];
      for (let i = 0; i < timeList.length - 1; i++) {
        const time = timeList[i];
        const nextTime = timeList[i + 1];
        const diff = nextTime.getTime() - time.getTime();
        diffList.push(diff);
      }
      const sortedDiffList = diffList.sort((a, b) => a - b);

      const p90Index = Math.min(
        Math.ceil(sortedDiffList.length * 0.9),
        sortedDiffList.length - 1,
      );
      const p90 = Math.ceil(sortedDiffList[p90Index] / 1000); // ms -> s

      this.logger.log(
        `[Command TTL Updated] ${commandId}: ${timeList.length}건, ${p90}초`,
      );

      await this.commandService.updateTtlById(commandId, p90);
    }

    this.logger.log(`[calcTtl] finished`);
  }

  // 매월 1일 12시. 최근 7일 이전의 명령어 조회 이력을 아카이브.
  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_NOON)
  async archiveCommandLog() {
    this.logger.log(`[archiveCommandLog] started`);
    await this.commandLogService.archiveLogs();
    this.logger.log(`[archiveCommandLog] finished`);
  }
}
