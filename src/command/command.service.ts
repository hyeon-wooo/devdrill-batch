import { Injectable } from '@nestjs/common';
import { CommandRepository } from './command.repository';

@Injectable()
export class CommandService {
  constructor(private readonly commandRepository: CommandRepository) {}

  async updateTtlById(id: number, ttl: number) {
    await this.commandRepository.updateTtlById(id, ttl);
  }
}
