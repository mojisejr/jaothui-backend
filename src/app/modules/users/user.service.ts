import { Injectable } from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO } from './dto/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  async createNewUser(user: CreateUserDTO) {
    const result = await this.userRepo.createNewUser(user);
    return result;
  }

  async findAllUsers() {
    const result = await this.userRepo.findAllUsers();
    return result;
  }

  async findUserById(userId: number) {
    const result = await this.userRepo.findUserById({ userId });
    return result;
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
