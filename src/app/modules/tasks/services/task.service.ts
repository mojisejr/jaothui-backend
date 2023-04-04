import { TaskRepository } from '../repositories/task.repository';
import { NewTask, UpdateTaskDTO } from '../dto/task.dto';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  constructor(private taskRepo: TaskRepository) {}

  async createNewTask(task: NewTask) {
    try {
      const result = await this.taskRepo.createNewTask(task);
      return result;
    } catch (error) {
      throw new BadRequestException(`createNewTask: create new task failed`);
    }
  }

  async findTaskById(taskId: number) {
    try {
      const task = await this.taskRepo.findTaskById({ taskId });
      return task;
    } catch (error) {
      throw new BadRequestException(
        `findTaskById: taskId ${taskId} lookup error`,
      );
    }
  }

  async findTaskByUserId(taskId: number, userId: number) {
    try {
      const tasks = await this.taskRepo.findTasksByUserId({ taskId, userId });
      return tasks;
    } catch (error) {
      throw new BadRequestException(
        `findTaskByUserId: ${taskId} of ${userId} lookup error`,
      );
    }
  }

  async findAllTasks() {
    try {
      const tasks = await this.taskRepo.findAllTasks();
      return tasks;
    } catch (error) {
      throw new BadRequestException(`findAllTasks: find all tasks error`);
    }
  }

  async findAllCompletedTasks() {
    try {
      const completedTasks = await this.taskRepo.findAllCompletedTasks();
      return completedTasks;
    } catch (error) {
      throw new BadRequestException(
        `findAllCompletedTasks: find all completed tasks error`,
      );
    }
  }

  async findAllTasksByUserId(userId: number) {
    try {
      const tasks = await this.taskRepo.findAllTasksByUserId({ userId });
      return tasks;
    } catch (error) {
      throw new BadRequestException(
        `findAllTasksByUserId: lookup all tasks of userId ${userId} failed`,
      );
    }
  }

  async findAllCompletedTaskByUserId(userId: number) {
    try {
      const tasks = await this.taskRepo.findAllCompletedTasksByUserId({
        userId,
      });
      return tasks;
    } catch (error) {
      throw new BadRequestException(
        `findAllCompletedTasksByUserId: completed tasks of ${userId} lookup error`,
      );
    }
  }

  async updateTaskByUserId(
    userId: number,
    taskId: number,
    data: UpdateTaskDTO,
  ) {
    try {
      const updated = await this.taskRepo.updateTaskByUserId(
        { userId, taskId },
        data,
      );

      return updated;
    } catch (error) {
      throw new BadRequestException(
        `updateTaskByUserId: update taskId ${taskId} of userId ${userId} failed`,
      );
    }
  }

  async markTaskAsCompleted(taskId: number, point: number) {
    try {
      const markedTask = await this.taskRepo.updateOneTask(
        { taskId },
        {
          pointEarned: point,
          completed: true,
          completed_date: new Date(),
        },
      );
      return markedTask;
    } catch (error) {
      throw new BadRequestException(
        `markTaskAsCompleted: mark taskId ${taskId} failed`,
      );
    }
  }

  async resetAllTasks() {
    try {
      const resetTasks = await this.taskRepo.resetAllTasks();
      return resetTasks;
    } catch (error) {
      throw new BadRequestException(`resetAllTasks: reset tasks failed`);
    }
  }

  async deleteTaskByUserId(userId: number, taskId: number) {
    try {
      const deleted = await this.taskRepo.deleteTaskByUserId({
        userId,
        taskId,
      });
      return deleted;
    } catch (error) {
      throw new BadRequestException(
        `deleteTraskByUserId: deleting taskId ${taskId} of userId ${userId} failed`,
      );
    }
  }

  async deleteTaskById(taskId: number) {
    try {
      const deleted = await this.taskRepo.deleteTaskById({ taskId });
      return deleted;
    } catch (error) {
      throw new BadRequestException(
        `deleteTraskByUserId: deleting taskId ${taskId}  failed`,
      );
    }
  }

  async checkCreatedTaskByUserId(userId: number, questId: number) {
    try {
      const tasks = await this.taskRepo.findManyTasks({ userId, questId });
      return tasks.length > 0 ? true : false;
    } catch (error) {
      throw new BadRequestException(`checkCreatedTaskByUserId: failed`);
    }
  }
}
