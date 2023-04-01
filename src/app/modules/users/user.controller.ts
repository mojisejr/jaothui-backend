import { Controller, Get, Post, Put, Body, Query, Param } from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { ResponseData } from 'src/shared/shared.interface';
import { hasData } from 'src/utils/checkNullorUndefind';
import { ErrorResponse, OkResponse } from 'src/utils/parseResponseData';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAllUsers(): Promise<ResponseData> {
    const users = await this.userService.findAllUsers();

    return !hasData(users)
      ? ErrorResponse(users, 'find all uses failed')
      : OkResponse(users, 'find all users sucessfully');
  }

  @Get('check')
  async isRegistered(@Query('wallet') wallet: string): Promise<ResponseData> {
    const result = await this.userService.checkCreatedByWallet(wallet);

    return !hasData(result)
      ? ErrorResponse(result, 'cannot check user registeration status')
      : OkResponse(result, 'sucessfully');
  }

  @Get(':userId')
  async findUserById(@Param('userId') userId: number): Promise<ResponseData> {
    const user = await this.userService.findUserById(userId);

    return !hasData(user)
      ? ErrorResponse(user, `cannot get information of userId: ${userId}`)
      : OkResponse(user, `get information of userId: ${userId}`);
  }

  @Put(':userId')
  async updateUserById(
    @Param('userId') userId: number,
    @Body() updateData: UpdateUserDTO,
  ) {
    const updated = await this.userService.updateUser(userId, updateData);

    return !hasData(updated)
      ? ErrorResponse(updated, `updated data failed userId: ${userId}`)
      : OkResponse(updated, `updated data succesfully userId: ${userId}`);
  }

  @Post()
  async createNewUser(@Body() user: CreateUserDTO): Promise<ResponseData> {
    const created = await this.userService.createNewUser(user);

    return !hasData(created)
      ? ErrorResponse(created, `user created failed`)
      : OkResponse(created, `user created succesfully`);
  }
}
