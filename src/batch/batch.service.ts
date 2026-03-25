import { Injectable, Logger } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';

@Injectable()
export class BatchService {
  private logger = new Logger(BatchService.name);

  @Timeout(1000)
  async run() {
    this.logger.log('Batch started');
  }
}
