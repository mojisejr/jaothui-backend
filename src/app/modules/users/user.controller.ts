import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { CreateUserDTO } from './dto/user.dto';
import { User } from './user.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAllUsers(): Promise<User[]> {
    return await this.userService.findAllUsers();
  }

  @Get('check')
  async isRegistered(@Query('wallet') wallet: string) {
    return await this.userService.checkCreatedByWallet(wallet);
  }

  @Get(':userId')
  async findUserById(@Param('userId') userId: number): Promise<User> {
    return await this.userService.findUserById(userId);
  }

  @Post()
  async createNewUser(@Body() user: CreateUserDTO): Promise<User> {
    return await this.userService.createNewUser(user);
  }
}
