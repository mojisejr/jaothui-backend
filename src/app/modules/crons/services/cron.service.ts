import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  @Cron(CronExpression.EVERY_30_SECONDS)
  handleCron() {
    //TODO: reset all tasks everyday
    this.logger.debug('Cron: Called when current second is 30');
  }
}
