import { CreateQuestDTO, UpdateQuestDTO } from './dto/quest.dto';
import { QuestRepository } from './quest.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QuestService {
  constructor(private questRepo: QuestRepository) {}

  async createNewQuest(quest: CreateQuestDTO) {
    const result = await this.questRepo.createNewQuest(quest);
    return result;
  }

  async findQuestById(questId: number) {
    const result = await this.questRepo.findQuestById({ questId });
    return result;
  }

  async findAllQuests() {
    const results = await this.questRepo.findAllQuests();
    return results;
  }

  async updateQuestById(questId: number, data: UpdateQuestDTO) {
    const updated = await this.questRepo.updateQuestById({ questId }, data);
    return updated;
  }

  async deleteQuestById(questId: number) {
    const deleted = await this.questRepo.deleteQuestById({ questId });
    return deleted;
  }
}
