import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.module';
import { QuestModule } from './modules/quests/quest.module';
import { TaskModule } from './modules/tasks/task.module';
import { RedemptionModule } from './modules/redemption/redemption.module';

@Module({
  imports: [UserModule, QuestModule, TaskModule, RedemptionModule],
  exports: [UserModule, QuestModule, TaskModule, RedemptionModule],
})
export class Modules {}
