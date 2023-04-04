import { Module } from '@nestjs/common';
import { TaskRepository } from './repositories/task.repository';
import { TaskService } from './services/task.service';
import { TaskController } from './controllers/task.controller';
import { UserService } from '../users/services/user.service';
import { QuestService } from '../quests/services/quest.service';
import { UserRepository } from '../users/repositories/user.repository';
import { QuestRepository } from '../quests/repositories/quest.repository';
import { UserPointService } from '../userpoints/services/userpoints.service';
import { UserPointRepository } from '../userpoints/repositories/userpoints.repository';

@Module({
  controllers: [TaskController],
  providers: [
    TaskService,
    UserService,
    UserPointService,
    QuestService,
    UserRepository,
    UserPointRepository,
    QuestRepository,
    TaskRepository,
  ],
})
export class TaskModule {}
