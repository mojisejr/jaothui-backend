import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.module';
import { QuestModule } from './modules/quests/quest.module';
import { TaskModule } from './modules/tasks/task.module';
import { RedemptionModule } from './modules/redemption/redemption.module';
import { UserPointsModule } from './modules/userpoints/userpoints.module';

@Module({
  imports: [
    UserModule,
    QuestModule,
    TaskModule,
    UserPointsModule,
    RedemptionModule,
  ],
  exports: [
    UserModule,
    QuestModule,
    TaskModule,
    UserPointsModule,
    RedemptionModule,
  ],
})
export class Modules {}
