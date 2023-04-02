import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Query,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { ResponseData } from 'src/shared/shared.interface';
import { OkResponse } from 'src/utils/parseResponseData';
import { CreateUserBodyValidationPipe } from './pipes/user.create.pipes';
import { UpdateUserBodyValidationPipe } from './pipes/user.update.pipes';
import { EthAddressValidationPipe } from 'src/shared/pipes/address.validation';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAllUsers(): Promise<ResponseData> {
    const users = await this.userService.findAllUsers();

    return OkResponse(users, 'find all users sucessfully');
  }

  @Get('check')
  async isRegistered(
    @Query('wallet', EthAddressValidationPipe) wallet: string,
  ): Promise<ResponseData> {
    const result = await this.userService.checkCreatedByWallet(wallet);

    return OkResponse(result, 'sucessfully');
  }

  @Get(':userId')
  async findUserById(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<ResponseData> {
    const user = await this.userService.findUserById(userId);

    return OkResponse(user, `get information of userId: ${userId}`);
  }

  @Get('/wallet/:wallet')
  async findUserByWallet(
    @Param('wallet', EthAddressValidationPipe) wallet: string,
  ): Promise<ResponseData> {
    const user = await this.userService.findUserBywallet(wallet);

    return OkResponse(user, `get user by wallet ${wallet} successfully`);
  }

  @Put(':userId')
  async updateUserById(
    @Param('userId', ParseIntPipe) userId: number,
    @Body(UpdateUserBodyValidationPipe) updateData: UpdateUserDTO,
  ) {
    const updated = await this.userService.updateUser(userId, updateData);

    return OkResponse(updated, `updated data succesfully userId: ${userId}`);
  }

  @Post()
  async createNewUser(
    @Body(CreateUserBodyValidationPipe) user: CreateUserDTO,
  ): Promise<ResponseData> {
    const created = await this.userService.createNewUser(user);

    return OkResponse(created, `user created succesfully`, 201);
  }
}
