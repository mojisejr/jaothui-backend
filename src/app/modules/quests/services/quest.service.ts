import { CreateQuestDTO, UpdateQuestDTO } from '../dto/quest.dto';
import { QuestRepository } from '../repositories/quest.repository';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class QuestService {
  constructor(private questRepo: QuestRepository) {}

  async createNewQuest(quest: CreateQuestDTO) {
    try {
      const result = await this.questRepo.createNewQuest(quest);
      return result;
    } catch (error) {
      throw new BadRequestException(`createNewQuest: create new quest failed`);
    }
  }

  async findQuestById(questId: number) {
    try {
      const result = await this.questRepo.findQuestById({ questId });
      return result;
    } catch (error) {
      throw new BadRequestException(
        `findQuestById: questId ${questId} lookup failed`,
      );
    }
  }

  async findAllQuests() {
    try {
      const results = await this.questRepo.findAllQuests();
      return results;
    } catch (error) {
      throw new BadRequestException(`findAllQuests: all quests lookup failed`);
    }
  }

  async updateQuestById(questId: number, data: UpdateQuestDTO) {
    try {
      const updated = await this.questRepo.updateQuestById({ questId }, data);
      return updated;
    } catch (error) {
      throw new BadRequestException(
        `updateQuest: questId ${questId} updating failed`,
      );
    }
  }

  async deleteQuestById(questId: number) {
    try {
      const deleted = await this.questRepo.deleteQuestById({ questId });
      return deleted;
    } catch (error) {
      throw new BadRequestException(
        `deleteQuestById: deleting questId ${questId} failed`,
      );
    }
  }
}
