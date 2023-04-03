import { Module } from '@nestjs/common';
import { QuestController } from './controllers/quest.controller';
import { QuestRepository } from './repositories/quest.repository';
import { QuestService } from './services/quest.service';

@Module({
  controllers: [QuestController],
  providers: [QuestService, QuestRepository],
})
export class QuestModule {}
