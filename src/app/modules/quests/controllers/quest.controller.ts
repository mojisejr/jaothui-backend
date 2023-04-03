import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ResponseData } from 'src/shared/shared.interface';
import { hasData } from 'src/utils/checkNullorUndefind';
import { OkResponse } from 'src/utils/parseResponseData';
import { CreateQuestDTO, UpdateQuestDTO } from '../dto/quest.dto';
import { QuestService } from '../services/quest.service';
import { UpdateQuestBodyValidationPipe } from '../pipes/quest.update.pipe';
import { CreateQuestBodyValidationPipe } from '../pipes/quest.create.pipe';

@Controller('quests')
export class QuestController {
  constructor(private questService: QuestService) {}

  @Post()
  async createNewQuest(
    @Body(CreateQuestBodyValidationPipe) quest: CreateQuestDTO,
  ): Promise<ResponseData> {
    const result = await this.questService.createNewQuest(quest);
    return OkResponse(result, `create new quest ${quest.name} successfully`);
  }

  @Get(':questId')
  async findQuestById(
    @Param('questId', ParseIntPipe) questId: number,
  ): Promise<ResponseData> {
    const quest = await this.questService.findQuestById(questId);

    if (!hasData(quest)) {
      throw new NotFoundException(
        `findQuestById: questId ${questId} not found`,
      );
    }
    return OkResponse(quest, `get quest by id ${questId} successfully`);
  }

  @Get()
  async findAllQuests(): Promise<ResponseData> {
    const quests = await this.questService.findAllQuests();

    if (!hasData(quests)) {
      throw new NotFoundException(`findAllQuests: no quest found`);
    }

    return OkResponse(quests, `find all quest successfully`);
  }

  @Put(':questId')
  async updateQuestById(
    @Param('questId', ParseIntPipe) questId: number,
    @Body(UpdateQuestBodyValidationPipe) data: UpdateQuestDTO,
  ) {
    const updated = await this.questService.updateQuestById(questId, data);
    return OkResponse(updated, `questId ${questId} updated successfully`);
  }

  @Put('delete/:questId')
  async deleteQuestById(@Param('questId', ParseIntPipe) questId: number) {
    const deleted = await this.questService.deleteQuestById(questId);
    return OkResponse(deleted, `deleting questId ${questId} successfully`);
  }
}
