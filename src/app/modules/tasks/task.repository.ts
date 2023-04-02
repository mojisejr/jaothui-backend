import { prisma } from '../../../database/prisma';
import { DailyTask, Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskRepository {
  async createNewTask(
    data: Prisma.DailyTaskUncheckedCreateInput,
  ): Promise<DailyTask> {
    try {
      const result = await prisma.dailyTask.create({ data });
      return result;
    } catch (error) {
      console.log(`repository: create task failed`);
    }
  }

  async findTaskById(
    input: Prisma.DailyTaskWhereUniqueInput,
  ): Promise<DailyTask> {
    try {
      const task = await prisma.dailyTask.findUnique({
        where: { taskId: input.taskId },
      });
      return task;
    } catch (error) {
      console.log(`repository: cannot find taskId ${input.taskId}`);
    }
  }

  async findTasksByUserId(
    input: Prisma.DailyTaskWhereInput,
  ): Promise<DailyTask[]> {
    try {
      const tasks = await prisma.dailyTask.findMany({
        where: { userId: input.userId },
      });
      return tasks;
    } catch (error) {
      console.log(`repository: cannot find tasks for ${input.userId}`);
    }
  }

  async findAllTasks(): Promise<DailyTask[]> {
    try {
      const tasks = await prisma.dailyTask.findMany();
      return tasks;
    } catch (error) {
      console.log(`repository: cannot find tasks ${error.message}`);
    }
  }

  async findAllTasksByUserId(
    input: Prisma.DailyTaskWhereInput,
  ): Promise<DailyTask[]> {
    try {
      const tasks = await prisma.dailyTask.findMany({
        where: { userId: input.userId },
      });
      return tasks;
    } catch (error) {
      console.log(`repository: cannot find tasks ${error.message}`);
    }
  }

  async updateTaskByUserId(
    input: Prisma.DailyTaskWhereInput,
    data: Prisma.DailyTaskUncheckedUpdateInput,
  ) {
    try {
      const updated = await prisma.dailyTask.updateMany({
        data,
        where: { userId: input.userId, taskId: input.taskId },
      });
      return updated;
    } catch (error) {
      console.log(`repository: cannot update by user id ${input.userId}`);
    }
  }

  async deleteTaskByUserId(input: Prisma.DailyTaskWhereInput) {
    try {
      const deleted = await prisma.dailyTask.deleteMany({
        where: { userId: input.userId, taskId: input.taskId },
      });
      return deleted;
    } catch (error) {
      console.log(`repository: cannot delete by user id ${input.userId}`);
    }
  }
}
