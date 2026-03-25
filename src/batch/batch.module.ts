import { Module } from '@nestjs/common';
import { BatchService } from './batch.service';
import { ScheduleModule } from '@nestjs/schedule';
import { CommandModule } from 'src/command/command.module';
import { LogModule } from 'src/log/log.module';

@Module({
  imports: [ScheduleModule.forRoot(), CommandModule, LogModule],
  providers: [BatchService],
})
export class BatchModule {}
