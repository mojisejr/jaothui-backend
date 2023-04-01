import { Module } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';

@Module({
  controllers: [],
  providers: [TaskService, TaskRepository],
})
export class TaskModule {}
