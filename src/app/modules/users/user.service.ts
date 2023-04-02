import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hasData } from 'src/utils/checkNullorUndefind';
import { CreateUserDTO, UpdateUserDTO } from './dto/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  async createNewUser(user: CreateUserDTO) {
    try {
      const result = await this.userRepo.createNewUser(user);
      return result;
    } catch (error) {
      throw new BadRequestException(`createNewUser: user creation failed.`, {
        cause: new Error(),
      });
    }
  }

  async findAllUsers() {
    try {
      const users = await this.userRepo.findAllUsers();
      if (!hasData(users)) {
        throw new NotFoundException(`findAllUsers: no any user found.`, {
          cause: new Error(),
        });
      }
      return users;
    } catch (error) {
      throw new BadRequestException(
        `findAllUsers: find all users operation failed.`,
        { cause: new Error() },
      );
    }
  }

  async findUserById(userId: number) {
    try {
      const result = await this.userRepo.findUserById({ userId });
      if (!hasData(result)) {
        throw new NotFoundException(`userId: ${userId} not found`, {
          cause: new Error(),
        });
      }
      return result;
    } catch (error) {
      throw new BadRequestException(
        `findUserById: userId ${userId} finding error`,
        { cause: new Error() },
      );
    }
  }

  async findUserBywallet(wallet: string) {
    const result = await this.userRepo.findUserByWallet(wallet);
    return result;
  }

  async updateUser(userId: number, user: UpdateUserDTO) {
    const result = await this.userRepo.updateUser({ userId }, user);
    return result;
  }

  async checkCreatedByWallet(wallet: string) {
    const result = await this.userRepo.checkCreatedByWallet(wallet);
    return result;
  }
}
