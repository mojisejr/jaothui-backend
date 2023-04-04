import { BadRequestException, Injectable } from '@nestjs/common';
import { RedemptionRepository } from '../repositories/redemption.repository';
import { CreateRedemptionItemDTO } from '../dto/create.redemption.dto';
import { CreateRedemptionLogDTO } from '../dto/create.log.dto';
import { UpdateRedemptionItemDTO } from '../dto/update.redemption.dto';
import { UpdateRedemptionLogDTO } from '../dto/update.log.dto';

@Injectable()
export class RedemptionService {
  constructor(private redemptionRepo: RedemptionRepository) {}

  async createNewRedemption(item: CreateRedemptionItemDTO) {
    try {
      console.log('item', item);
      const created = await this.redemptionRepo.createNewRedemption(item);
      return created;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        `createNewRedemption: redemption creation error`,
      );
    }
  }

  async logRedeemedItem(logData: CreateRedemptionLogDTO) {
    try {
      const logged = await this.redemptionRepo.logRedeemedItem(logData);
      return logged;
    } catch (error) {
      throw new BadRequestException(`logRedeemedItem: redeemed failed`);
    }
  }

  async findAllRedemptionItems() {
    try {
      const items = await this.redemptionRepo.findAllRedemptionItems();
      return items;
    } catch (error) {
      throw new BadRequestException(
        `findAllRedemptionItems: all item lookup error`,
      );
    }
  }

  async findAllRedemptionAvailableItems() {
    try {
      const items = await this.redemptionRepo.findAllRedemptionAvailableItems();
      return items;
    } catch (error) {
      throw new BadRequestException(
        `findAllRedemptionAvailableItem: all available lookup error`,
      );
    }
  }

  async findRedemptionItemById(itemId: number) {
    try {
      const item = await this.redemptionRepo.findRedemptionItemById({ itemId });
      return item;
    } catch (error) {
      throw new BadRequestException(
        `findRedemptionItemById: itemId ${itemId} look up failed`,
      );
    }
  }

  async findAllRedemptionLogsByUserId(userId: number) {
    try {
      const log = await this.redemptionRepo.findAllRedemptionLogsByUserId({
        userId,
      });
      return log;
    } catch (error) {
      throw new BadRequestException(
        `findAllRedemptionLogsByUserId: userId ${userId} look up failed`,
      );
    }
  }

  async findRedemptionLogByUserId(userId: number, itemId: number) {
    try {
      const log = await this.redemptionRepo.findRedemptionLogByUserId({
        userId,
        itemId,
      });
      return log;
    } catch (error) {
      throw new BadRequestException(
        `findRedemptionLogByUserId: userId ${userId} look up failed`,
      );
    }
  }

  async updateRedemptionItemById(
    itemId: number,
    itemData: UpdateRedemptionItemDTO,
  ) {
    try {
      const updated = await this.redemptionRepo.updateRedemptionItemById(
        { itemId },
        itemData,
      );

      return updated;
    } catch (error) {
      throw new BadRequestException(
        `updateRedemptionItemById: update itemId ${itemId} updating error`,
      );
    }
  }

  async updateRedemptionLogByUserId(
    logId: number,
    userId: number,
    logData: UpdateRedemptionLogDTO,
  ) {
    try {
      const updated = await this.redemptionRepo.updateRedemptionLogByUserId(
        { logId, userId },
        logData,
      );
      return updated;
    } catch (error) {
      throw new BadRequestException(
        `updateRedemptionLogByUserId: update logId ${logId} of userId ${userId} updating error`,
      );
    }
  }

  async deleteRedemptionItem(itemId: number) {
    try {
      const deleted = await this.redemptionRepo.deleteRedemptionItem({
        itemId,
      });
      return deleted;
    } catch (error) {
      throw new BadRequestException(
        `deleteRedemptionItem: delete logId ${itemId} failed`,
      );
    }
  }
}
