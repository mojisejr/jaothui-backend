import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.module';
import { QuestModule } from './modules/quests/quest.module';

@Module({
  imports: [UserModule, QuestModule],
  exports: [UserModule, QuestModule],
})
export class Modules {}
