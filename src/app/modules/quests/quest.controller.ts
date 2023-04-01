import { Controller, Get, Post, Put, Body, Query, Param } from '@nestjs/common';
import { ResponseData } from 'src/shared/shared.interface';
import { hasData } from 'src/utils/checkNullorUndefind';
import { ErrorResponse, OkResponse } from 'src/utils/parseResponseData';
import { CreateQuestDTO, UpdateQuestDTO } from './dto/quest.dto';
import { QuestService } from './quest.service';

@Controller('quests')
export class QuestController {
  constructor(private questService: QuestService) {}

  @Post()
  async createNewQuest(@Body() quest: CreateQuestDTO): Promise<ResponseData> {
    const result = await this.questService.createNewQuest(quest);
    return !hasData(result)
      ? ErrorResponse(result, `create new quest ${quest.name} failed`)
      : OkResponse(result, `create new quest ${quest.name} successfully`);
  }

  @Get(':questId')
  async findQuestById(
    @Param('questId') questId: number,
  ): Promise<ResponseData> {
    const quest = await this.questService.findQuestById(questId);
    return !hasData(quest)
      ? ErrorResponse(quest, `get quest by id ${questId} failed`)
      : OkResponse(quest, `get quest by id ${questId} successfully`);
  }

  @Get()
  async findAllQuests(): Promise<ResponseData> {
    const quests = await this.questService.findAllQuests();
    return !hasData(quests)
      ? ErrorResponse(quests, `find all quests failed`)
      : OkResponse(quests, `find all quest successfully`);
  }

  @Put(':questId')
  async updateQuestById(
    @Param('questId') questId: number,
    @Body() data: UpdateQuestDTO,
  ) {
    const updated = await this.questService.updateQuestById(questId, data);
    return !hasData(updated)
      ? ErrorResponse(updated, `questId ${questId} updated failed`)
      : OkResponse(updated, `questId ${questId} updated successfully`);
  }

  @Put('delete/:questId')
  async deleteQuestById(@Param('questId') questId: number) {
    const deleted = await this.questService.deleteQuestById(questId);
    return !hasData(deleted)
      ? ErrorResponse(deleted, `deleting questId ${questId} failed`)
      : OkResponse(deleted, `deleting questId ${questId} successfully`);
  }
}
