import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { RedemptionService } from '../services/redemption.service';
import { hasData } from 'src/utils/checkNullorUndefind';
import { ResponseData } from 'src/shared/shared.interface';
import { OkResponse } from 'src/utils/parseResponseData';

@Controller('redeem')
export class RedemptionController {
  constructor(private redemptionService: RedemptionService) {}

  @Get('/items')
  async getAllRedemptionItems(): Promise<ResponseData> {
    const items = this.redemptionService.findAllRedemptionItems();

    if (!hasData(items)) {
      throw new NotFoundException(
        `getAllRedemptionItems: no redeem item found`,
      );
    }
    return OkResponse(items, 'items founded');
  }

  @Get('/logs/:userId')
  async getAllRedemptionLogsByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    const logs = await this.redemptionService.findAllRedemptionLogsByUserId(
      userId,
    );

    if (!hasData(logs)) {
      throw new NotFoundException(
        `getAllRedemptionLogsByUserId: logs of userId ${userId} not found`,
      );
    }

    return OkResponse(logs, `logs of userId ${userId}`);
  }
}
