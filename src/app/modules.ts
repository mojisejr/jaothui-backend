import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.module';
import { QuestModule } from './modules/quests/quest.module';
import { TaskModule } from './modules/tasks/task.module';

@Module({
  imports: [UserModule, QuestModule, TaskModule],
  exports: [UserModule, QuestModule, TaskModule],
})
export class Modules {}
