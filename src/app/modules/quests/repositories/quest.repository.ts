import { prisma } from '../../../../database/prisma';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QuestRepository {
  async createNewQuest(quest: Prisma.QuestUncheckedCreateInput) {
    const result = await prisma.quest.create({ data: quest });
    return result;
  }

  async findQuestById(input: Prisma.QuestWhereUniqueInput) {
    const result = await prisma.quest.findUnique({
      where: { questId: input.questId },
    });
    return result;
  }

  async findAllQuests() {
    const result = await prisma.quest.findMany();
    return result;
  }

  async updateQuestById(
    input: Prisma.QuestWhereUniqueInput,
    data: Prisma.QuestUncheckedUpdateInput,
  ) {
    const result = await prisma.quest.update({
      data,
      where: { questId: input.questId },
    });
    return result;
  }

  async deleteQuestById(input: Prisma.QuestWhereUniqueInput) {
    const result = await prisma.quest.delete({
      where: { questId: input.questId },
    });
    return result;
  }
}
