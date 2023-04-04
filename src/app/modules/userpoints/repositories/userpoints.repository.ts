import { prisma } from '../../../../database/prisma';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserPointRepository {
  async createNewUserPoint(input: Prisma.UserPointUncheckedCreateInput) {
    const userPoint = await prisma.userPoint.create({ data: input });
    return userPoint;
  }

  async findUserPointByUserId(input: Prisma.UserPointWhereUniqueInput) {
    const userPoint = await prisma.userPoint.findUnique({ where: input });
    return userPoint;
  }

  async updateUserPoint(
    input: Prisma.UserPointWhereInput,
    data: Prisma.UserPointUncheckedUpdateInput,
  ) {
    const updated = await prisma.userPoint.updateMany({ where: input, data });
    return updated;
  }
}
