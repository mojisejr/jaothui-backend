import { Module } from '@nestjs/common';
import { Modules } from './app/modules';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './app/modules/crons/services/cron.service';

@Module({
  imports: [Modules, ScheduleModule.forRoot()],
  controllers: [],
  providers: [CronService],
})
export class AppModule {}
