import { Module } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { UserService } from '../users/user.service';
import { QuestService } from '../quests/quest.service';
import { UserRepository } from '../users/user.repository';
import { QuestRepository } from '../quests/quest.repository';

@Module({
  controllers: [TaskController],
  providers: [
    TaskService,
    UserService,
    QuestService,
    UserRepository,
    QuestRepository,
    TaskRepository,
  ],
})
export class TaskModule {}
