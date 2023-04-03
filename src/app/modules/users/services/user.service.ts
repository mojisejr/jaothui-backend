import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO } from '../dto/user.dto';
import { UserRepository } from '../repositories/user.repository';

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
      return users;
    } catch (error) {
      throw new BadRequestException(
        `findAllUsers: find all users operation failed. ${error.message}`,
      );
    }
  }

  async findAllUsersWithTasks() {
    try {
      const results = await this.userRepo.findAllUserWithTasks();
      return results;
    } catch (error) {
      throw new BadRequestException(
        `findAllUsersWithTasks: find all users with tasks failed.`,
      );
    }
  }

  async findUserById(userId: number) {
    try {
      const result = await this.userRepo.findUserById({ userId });
      return result;
    } catch (error) {
      throw new BadRequestException(
        `findUserById: userId ${userId} lookup error`,
      );
    }
  }

  async findUserWithTasksById(userId: number) {
    try {
      const result = await this.userRepo.findUserWithTasksById({ userId });
      return result;
    } catch (error) {
      throw new BadRequestException(
        `findUserWithTasksById: userId: ${userId} lookup error`,
      );
    }
  }

  async findUserBywallet(wallet: string) {
    try {
      const result = await this.userRepo.findUserByWallet(wallet);
      return result;
    } catch (error) {
      throw new BadRequestException(
        `findUserBywallet: find user by wallet error`,
      );
    }
  }

  async findUserWithTasksByWallet(wallet: string) {
    try {
      const result = await this.userRepo.findUserWithTasksByWallet({
        walletAddress: wallet,
      });
      return result;
    } catch (error) {
      throw new BadRequestException(
        `findUserWithTasksByWallet: wallet ${wallet} look up error`,
      );
    }
  }

  async updateUser(userId: number, user: UpdateUserDTO) {
    try {
      const result = await this.userRepo.updateUser({ userId }, user);
      return result;
    } catch (error) {
      throw new BadRequestException(
        `updateUser: update user data of ${userId} failed`,
      );
    }
  }

  async checkCreatedByWallet(wallet: string) {
    try {
      const result = await this.userRepo.checkCreatedByWallet(wallet);
      return result;
    } catch (error) {
      throw new BadRequestException(
        `checkCreatedByWallet: cannot check this wallet address ${wallet}`,
      );
    }
  }
}
