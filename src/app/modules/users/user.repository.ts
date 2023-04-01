import { prisma } from 'src/database/prisma';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  async createNewUser(user: Prisma.UserUncheckedCreateInput) {
    try {
      const result = await prisma.user.create({ data: user });
      return result;
    } catch (error) {
      console.log(`repository: create user failed ${error.message}`);
    }
  }
  async findUserById(input: Prisma.UserWhereUniqueInput) {
    try {
      const result = await prisma.user.findUnique({
        where: { userId: +input.userId },
      });
      return result;
    } catch (error) {
      console.log(`repository: find user by userId failed ${error.message}`);
    }
  }

  async findUserByWallet(wallet: string) {
    try {
      const result = await prisma.user.findUnique({
        where: { walletAddress: wallet },
      });
      return result;
    } catch (error) {
      console.log(
        `repository: find user by wallet address failed  ${error.message}`,
      );
    }
  }

  async findAllUsers() {
    try {
      const result = await prisma.user.findMany();
      return result;
    } catch (error) {
      console.log(`repository: find all users failed ${error.message}`);
    }
  }

  async updateUser(
    input: Prisma.UserWhereUniqueInput,
    user: Prisma.UserUncheckedUpdateInput,
  ) {
    try {
      const updated = await prisma.user.update({
        data: user,
        where: { userId: +input.userId },
      });
      return updated;
    } catch (error) {
      console.log(`repository: update by user id failed ${error.message}`);
    }
  }

  async checkCreatedByWallet(wallet: string) {
    try {
      const result = await prisma.user.findUnique({
        where: { walletAddress: wallet },
      });
      console.log(result);
      return result == undefined ? false : true;
    } catch (error) {
      console.log(`repository: check user by wallet failed ${error.message}`);
    }
  }
}
