import { prisma } from '../../../../database/prisma';
import { DailyTask, Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskRepository {
  async createNewTask(
    data: Prisma.DailyTaskUncheckedCreateInput,
  ): Promise<DailyTask> {
    const result = await prisma.dailyTask.create({ data });
    return result;
  }

  async findTaskById(
    input: Prisma.DailyTaskWhereUniqueInput,
  ): Promise<DailyTask> {
    const task = await prisma.dailyTask.findUnique({
      where: { taskId: input.taskId },
      include: {
        user: true,
        quest: true,
      },
    });
    return task;
  }

  async findTasksByUserId(
    input: Prisma.DailyTaskWhereInput,
  ): Promise<DailyTask[]> {
    const tasks = await prisma.dailyTask.findMany({
      where: { userId: input.userId },
      include: {
        quest: true,
        user: true,
      },
    });
    return tasks;
  }

  async findAllTasks(): Promise<DailyTask[]> {
    const tasks = await prisma.dailyTask.findMany();
    return tasks;
  }

  async findAllCompletedTasks(): Promise<DailyTask[]> {
    const completedTasks = await prisma.dailyTask.findMany({
      where: { completed: true },
    });
    return completedTasks;
  }

  async findAllTasksByUserId(
    input: Prisma.DailyTaskWhereInput,
  ): Promise<DailyTask[]> {
    const tasks = await prisma.dailyTask.findMany({
      where: { userId: input.userId },
      include: {
        user: true,
        quest: true,
      },
    });
    return tasks;
  }

  async findManyTasks(input: Prisma.DailyTaskWhereInput) {
    const tasks = await prisma.dailyTask.findMany({
      where: input,
    });

    return tasks;
  }

  async findAllCompletedTasksByUserId(
    input: Prisma.DailyTaskWhereInput,
  ): Promise<DailyTask[]> {
    const tasks = await prisma.dailyTask.findMany({
      where: { userId: input.userId, completed: true },
      include: {
        user: true,
        quest: true,
      },
    });

    return tasks;
  }

  async updateTaskByUserId(
    input: Prisma.DailyTaskWhereInput,
    data: Prisma.DailyTaskUncheckedUpdateInput,
  ) {
    const updated = await prisma.dailyTask.updateMany({
      data: { ...data, completed_date: new Date() },
      where: { userId: input.userId, taskId: input.taskId },
    });
    return updated;
  }

  async updateOneTask(
    input: Prisma.DailyTaskWhereUniqueInput,
    data: Prisma.DailyTaskUncheckedUpdateInput,
  ) {
    const updated = await prisma.dailyTask.update({
      where: input,
      data,
    });
    return updated;
  }

  async resetAllTasks() {
    const updated = await prisma.dailyTask.updateMany({
      data: {
        completed: false,
      },
    });
    return updated;
  }

  async deleteTaskByUserId(input: Prisma.DailyTaskWhereInput) {
    const deleted = await prisma.dailyTask.deleteMany({
      where: { userId: input.userId, taskId: input.taskId },
    });
    return deleted;
  }

  async deleteTaskById(input: Prisma.DailyTaskWhereUniqueInput) {
    const deleted = await prisma.dailyTask.delete({
      where: { taskId: input.taskId },
    });
    return deleted;
  }
}
