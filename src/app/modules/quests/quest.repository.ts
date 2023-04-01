import { prisma } from '../../../database/prisma';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QuestRepository {
  async createNewQuest(quest: Prisma.QuestUncheckedCreateInput) {
    try {
      const result = await prisma.quest.create({ data: quest });
      return result;
    } catch (error) {
      console.log(`create new quest failed ${error.message}`);
    }
  }

  async findQuestById(input: Prisma.QuestWhereUniqueInput) {
    try {
      const result = await prisma.quest.findUnique({
        where: { questId: +input.questId },
      });
      return result;
    } catch (error) {
      console.log(`get quest by id ${input.questId} error ${error.message}`);
    }
  }

  async findAllQuests() {
    try {
      const result = await prisma.quest.findMany();
      return result;
    } catch (error) {
      console.log(`get all quests ${error.message}`);
    }
  }

  async updateQuestById(
    input: Prisma.QuestWhereUniqueInput,
    data: Prisma.QuestUncheckedUpdateInput,
  ) {
    try {
      const result = await prisma.quest.update({
        data,
        where: { questId: +input.questId },
      });
      return result;
    } catch (error) {
      console.log(
        `update quest by id ${input.questId} failed ${error.message}`,
      );
    }
  }

  async deleteQuestById(input: Prisma.QuestWhereUniqueInput) {
    try {
      const result = await prisma.quest.delete({
        where: { questId: +input.questId },
      });
      return result;
    } catch (error) {
      console.log(`delete quest id ${input.questId} failed`);
    }
  }
}
