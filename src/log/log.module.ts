import { Module } from '@nestjs/common';
import { CommandLogService } from './command-log/command-log.service';
import { CommandLogRepository } from './command-log/command-log.repository';

@Module({
  providers: [CommandLogService, CommandLogRepository],
  exports: [CommandLogService],
})
export class LogModule {}
