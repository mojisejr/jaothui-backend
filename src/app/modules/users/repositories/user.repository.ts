import { prisma } from 'src/database/prisma';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  async createNewUser(user: Prisma.UserUncheckedCreateInput) {
    const result = await prisma.user.create({ data: user });
    return result;
  }
  async findUserById(input: Prisma.UserWhereUniqueInput) {
    const result = await prisma.user.findUnique({
      where: { userId: input.userId },
    });
    return result;
  }

  async findUserByWallet(wallet: string) {
    const result = await prisma.user.findUnique({
      where: { walletAddress: wallet },
    });
    return result;
  }

  async findAllUsers() {
    const result = await prisma.user.findMany();
    return result;
  }

  async findAllUserWithTasks() {
    const results = await prisma.user.findMany({
      include: { DailyTask: true },
    });
    return results;
  }

  async findUserWithTasksById(input: Prisma.UserWhereUniqueInput) {
    const result = await prisma.user.findUnique({
      where: { userId: input.userId },
      include: { DailyTask: true },
    });

    return result;
  }

  async findUserWithTasksByWallet(input: Prisma.UserWhereUniqueInput) {
    const result = await prisma.user.findUnique({
      where: { walletAddress: input.walletAddress },
      include: { DailyTask: true },
    });
    return result;
  }

  async updateUser(
    input: Prisma.UserWhereUniqueInput,
    user: Prisma.UserUncheckedUpdateInput,
  ) {
    const updated = await prisma.user.update({
      data: user,
      where: { userId: input.userId },
    });
    return updated;
  }

  async checkCreatedByWallet(wallet: string) {
    const result = await prisma.user.findUnique({
      where: { walletAddress: wallet },
    });
    return result == undefined || result == null ? false : true;
  }
}
