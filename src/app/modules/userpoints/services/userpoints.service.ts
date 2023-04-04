import { BadRequestException, Injectable } from '@nestjs/common';
import { UserPointRepository } from '../repositories/userpoints.repository';
import { CreateUserPointDTO, UpdateUserPointDTO } from '../dto/userpoint.dto';

@Injectable()
export class UserPointService {
  constructor(private userPointRepo: UserPointRepository) {}

  async createUserPoint(input: CreateUserPointDTO) {
    try {
      const created = await this.userPointRepo.createNewUserPoint({
        ...input,
        points: 0,
      });
      return created;
    } catch (error) {
      throw new BadRequestException(
        `createdUserPoint: userpoint created failed`,
      );
    }
  }

  async updateUserPoint(userId: number, data: UpdateUserPointDTO) {
    try {
      const updated = await this.userPointRepo.updateUserPoint(
        { userId },
        data,
      );
      return updated;
    } catch (error) {
      throw new BadRequestException(
        `updateUserPoint: update userPoint of userId ${userId}`,
      );
    }
  }

  async findUserPointByUserId(userId: number) {
    try {
      const user = await this.userPointRepo.findUserPointByUserId({ userId });
      return user;
    } catch (error) {
      throw new BadRequestException(`userId ${userId} lookup failed`);
    }
  }
}
