import { prisma } from '../../../../database/prisma';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedemptionRepository {
  async createNewRedemption(item: Prisma.RedemptionItemUncheckedCreateInput) {
    const result = await prisma.redemptionItem.create({ data: item });
    return result;
  }

  async logRedeemedItem(data: Prisma.RedemptionLogUncheckedCreateInput) {
    const result = await prisma.redemptionLog.create({ data });
    return result;
  }

  async findAllRedemptionItems() {
    const results = await prisma.redemptionItem.findMany();
    return results;
  }

  async findAllRedemptionAvailableItems() {
    const results = await prisma.redemptionItem.findMany({
      where: { available: true },
    });

    return results;
  }

  async findRedemptionItemById(input: Prisma.RedemptionItemWhereUniqueInput) {
    const result = await prisma.redemptionItem.findUnique({
      where: { itemId: input.itemId },
    });
    return result;
  }

  async findRedemptionItemAvailableForId(
    input: Prisma.RedemptionLogWhereInput,
  ) {
    const results = await prisma.redemptionItem.findMany({
      include: {
        RedemptionLog: true,
      },
    });

    const r = results.map((r) => {
      return r.RedemptionLog.filter((f) => f.userId == input.userId);
    });

    return r;
  }

  async findAllRedemptionLogsByUserId(input: Prisma.RedemptionLogWhereInput) {
    const results = await prisma.redemptionLog.findMany({
      where: { userId: input.userId },
    });
    return results;
  }

  async findRedemptionLogByUserId(input: Prisma.RedemptionLogWhereInput) {
    const result = await prisma.redemptionLog.findFirst({
      where: {
        userId: input.userId,
        itemId: input.itemId,
      },
    });
    return result;
  }

  async updateRedemptionItemById(
    input: Prisma.RedemptionItemWhereUniqueInput,
    data: Prisma.RedemptionItemUpdateInput,
  ) {
    const updated = await prisma.redemptionItem.update({
      data,
      where: { itemId: input.itemId },
    });

    return updated;
  }

  async updateRedemptionLogByUserId(
    input: Prisma.RedemptionLogWhereInput,
    data: Prisma.RedemptionLogUncheckedUpdateInput,
  ) {
    const updated = await prisma.redemptionLog.updateMany({
      data,
      where: { logId: input.logId, userId: input.userId },
    });

    return updated;
  }

  async deleteRedemptionItem(input: Prisma.RedemptionItemWhereUniqueInput) {
    const deleted = await prisma.redemptionItem.delete({
      where: { itemId: input.itemId },
    });

    return deleted;
  }
}
