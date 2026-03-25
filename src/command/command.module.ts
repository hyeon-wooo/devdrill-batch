import { Module } from '@nestjs/common';
import { CommandService } from './command.service';
import { CommandRepository } from './command.repository';

@Module({
  providers: [CommandService, CommandRepository],
  exports: [CommandService],
})
export class CommandModule {}
