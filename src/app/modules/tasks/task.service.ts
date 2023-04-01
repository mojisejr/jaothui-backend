import { TaskRepository } from './task.repository';
import { CreateTaskDTO, UpdateTaskDTO } from './dto/task.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  constructor(private taskRepo: TaskRepository) {}

  async createNewTask(task: CreateTaskDTO) {
    const result = await this.taskRepo.createNewTask(task);
    return result;
  }

  async findTaskById(taskId: number) {
    const task = await this.taskRepo.findTaskById({ taskId });
    return task;
  }

  async findTaskByUserId(taskId: number, userId: number) {
    const tasks = await this.taskRepo.findTasksByUserId({ taskId, userId });
    return tasks;
  }

  async findAllTasks() {
    const tasks = await this.taskRepo.findAllTasks();
    return tasks;
  }
}
