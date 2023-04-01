import { TaskRepository } from './task.repository';
import { CreateNewTaskDTO, UpdateTaskDTO } from './dto/task.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  constructor(private taskRepo: TaskRepository) {}

  async createNewTask(task: CreateNewTaskDTO) {
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

  async findAllTasksByUserId(userId: number) {
    const tasks = await this.taskRepo.findAllTasksByUserId({ userId });
    return tasks;
  }

  async updateTaskByUserId(
    userId: number,
    taskId: number,
    data: UpdateTaskDTO,
  ) {
    const updated = await this.taskRepo.updateTaskByUserId(
      { userId, taskId },
      data,
    );

    return updated;
  }

  async deleteTaskByUserId(userId: number, taskId: number) {
    const deleted = await this.taskRepo.deleteTaskByUserId({ userId, taskId });
    return deleted;
  }
}
