import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BatchModule } from './batch/batch.module';
import { ConfigModule } from '@nestjs/config';
import { CommandModule } from './command/command.module';
import { LogModule } from './log/log.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    BatchModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CommandModule,
    LogModule,
    DbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
