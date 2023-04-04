import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { RedemptionService } from '../services/redemption.service';
import { UserService } from '../../users/services/user.service';
import { hasData } from 'src/utils/checkNullorUndefind';
import { ResponseData } from 'src/shared/shared.interface';
import { OkResponse } from 'src/utils/parseResponseData';
import { CreateRedemptionLogDTO } from '../dto/create.log.dto';
import { UserPointService } from '../../userpoints/services/userpoints.service';
import { CreateRedemptionItemDTO } from '../dto/create.redemption.dto';

@Controller('redeem')
export class RedemptionController {
  constructor(
    private redemptionService: RedemptionService,
    private userService: UserService,
    private userPointService: UserPointService,
  ) {}

  @Post()
  async createNewRedemptionItem(
    @Body() redemptionItem: CreateRedemptionItemDTO,
  ) {
    const created = await this.redemptionService.createNewRedemption(
      redemptionItem,
    );
    return OkResponse(
      created,
      `createNewRedemptionItem: redemption item created`,
    );
  }

  @Get('/items')
  async getAllRedemptionItems(
    @Query('all') all: boolean,
  ): Promise<ResponseData> {
    if (all) {
      const items = await this.redemptionService.findAllRedemptionItems();

      if (!hasData(items)) {
        throw new NotFoundException(
          `getAllRedemptionItems: no redeem item found`,
        );
      }
      return OkResponse(items, 'items founded');
    }

    const items =
      await this.redemptionService.findAllRedemptionAvailableItems();

    if (!hasData(items)) {
      throw new NotFoundException(
        `getAllRedemptionItems: no redeem item found`,
      );
    }
    return OkResponse(items, 'items founded');
  }

  @Get('/log/:userId')
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

  @Post('/log')
  async redeem(@Body() redeemData: CreateRedemptionLogDTO) {
    const item = await this.redemptionService.findRedemptionItemById(
      redeemData.itemId,
    );
    const user = await this.userService.findUserById(redeemData.userId);

    if (!hasData(user)) {
      throw new NotFoundException(
        `redeem: userId ${redeemData.userId} not found`,
      );
    }

    const redeemed = await this.redemptionService.findRedemptionLogByUserId(
      user.userId,
      item.itemId,
    );

    if (hasData(redeemed)) {
      throw new BadRequestException(
        `redeem: this user have already been redeemed itemId ${redeemData.itemId}`,
      );
    }

    if (!hasData(item)) {
      throw new NotFoundException(`itemId ${redeemData.itemId} not found`);
    }

    const logs = await this.redemptionService.logRedeemedItem(redeemData);

    //redemption point reduction
    const { points } = await this.userPointService.findUserPointByUserId(
      logs.userId,
    );

    await this.userPointService.updateUserPoint(logs.userId, {
      points: points - item.cost,
    });

    return OkResponse(
      logs,
      `redeem: userId ${redeemData.userId} redemption successfully`,
    );
  }
}
