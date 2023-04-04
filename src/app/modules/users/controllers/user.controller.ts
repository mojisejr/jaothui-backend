import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Query,
  Param,
  ParseIntPipe,
  NotFoundException,
  ParseBoolPipe,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO } from '../dto/user.dto';
import { UserService } from '../services/user.service';
import { UserPointService } from '../../userpoints/services/userpoints.service';
import { ResponseData } from 'src/shared/shared.interface';
import { OkResponse } from 'src/utils/parseResponseData';
import { CreateUserBodyValidationPipe } from '../pipes/user.create.pipe';
import { UpdateUserBodyValidationPipe } from '../pipes/user.update.pipe';
import { EthAddressValidationPipe } from 'src/shared/pipes/address.validation';
import { hasData } from 'src/utils/checkNullorUndefind';
import { create } from 'domain';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private userPointService: UserPointService,
  ) {}

  @Get()
  async findAllUsers(
    @Query('tasks', ParseBoolPipe) task: boolean,
  ): Promise<ResponseData> {
    if (task) {
      const users = await this.userService.findAllUsersWithTasks();

      if (!hasData(users)) {
        throw new NotFoundException(`findAllUsers: not found`);
      }

      return OkResponse(users, 'find all users sucessfully');
    } else {
      const users = await this.userService.findAllUsers();

      if (!hasData) {
        throw new NotFoundException(`findAllUsers: not found`);
      }

      return OkResponse(users, 'find all users sucessfully');
    }
  }

  @Get('check')
  async isRegistered(
    @Query('wallet', EthAddressValidationPipe) wallet: string,
  ): Promise<ResponseData> {
    const result = await this.userService.checkCreatedByWallet(wallet);
    return OkResponse(result, `found ${wallet}`);
  }

  @Get(':userId')
  async findUserById(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('tasks', ParseBoolPipe) task: boolean,
  ): Promise<ResponseData> {
    if (task) {
      const user = await this.userService.findUserWithTasksById(userId);

      if (!hasData(user)) {
        throw new NotFoundException(`findUserById: ${userId} not found`);
      }

      return OkResponse(user, `get information of userId: ${userId}`);
    } else {
      const user = await this.userService.findUserById(userId);

      if (!hasData(user)) {
        throw new NotFoundException(`findUserById: ${userId} not found`);
      }

      return OkResponse(user, `get information of userId: ${userId}`);
    }
  }

  @Get('/wallet/:wallet')
  async findUserByWallet(
    @Param('wallet', EthAddressValidationPipe) wallet: string,
  ): Promise<ResponseData> {
    const user = await this.userService.findUserBywallet(wallet);

    if (!hasData(user)) {
      throw new NotFoundException(`findUserByWallet: ${wallet} not found`);
    }

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

    if (hasData(created)) {
      //create user Point data
      await this.userPointService.createUserPoint({
        userId: created.userId,
      });
    }

    return OkResponse(created, `user created succesfully`, 201);
  }
}
