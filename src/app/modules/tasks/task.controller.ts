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
import { TaskService } from './task.service';
import { hasData } from 'src/utils/checkNullorUndefind';
import { ErrorResponse, OkResponse } from 'src/utils/parseResponseData';
import { CreateNewTaskDTO, UpdateTaskDTO } from './dto/task.dto';
import { ResponseData } from 'src/shared/shared.interface';
import { UserService } from '../users/user.service';
import { QuestService } from '../quests/quest.service';

@Controller('tasks')
export class TaskController {
  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private questService: QuestService,
  ) {}

  @Post()
  async createNewTask(@Body() task: CreateNewTaskDTO): Promise<ResponseData> {
    const user = await this.userService.findUserById(task.userId);
    const quest = await this.questService.findQuestById(task.questId);
    const hasUser = hasData(user);
    const hasQuest = hasData(quest);
    if (hasUser && hasQuest) {
      const result = await this.taskService.createNewTask(task);
      return !hasData(result)
        ? ErrorResponse(result, `create new task failed`)
        : OkResponse(result, `create new task successfully`);
    } else if (!hasUser) {
      return ErrorResponse(
        null,
        `cannot create new task for un-registered user`,
      );
    } else if (!hasQuest) {
      return ErrorResponse(null, `cannot create new task for the has no quest`);
    }
  }

  @Get()
  async findAllTasks(): Promise<ResponseData> {
    const tasks = await this.taskService.findAllTasks();
    return !hasData(tasks)
      ? ErrorResponse(tasks, `find all tasks failed`)
      : OkResponse(tasks, `find all tasks successfully`);
  }

  @Get(':taskId')
  async findTaskById(
    @Param('taskId', ParseIntPipe) taskId: number,
  ): Promise<ResponseData> {
    const task = await this.taskService.findTaskById(taskId);
    return !hasData(task)
      ? ErrorResponse(task, `find taskId ${taskId} failed`)
      : OkResponse(task, `found taskId ${taskId}`);
  }

  @Get('/user/:userId')
  async findAllTaskByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<ResponseData> {
    const tasks = await this.taskService.findAllTasksByUserId(userId);
    return !hasData(tasks)
      ? ErrorResponse(tasks, `find all task of userId ${userId} failed`)
      : OkResponse(tasks, `find all tasks of userId ${userId} successfully`);
  }

  @Put('/user/:userId/:taskId')
  async updateTaskByUserId(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() task: UpdateTaskDTO,
  ) {
    const updated = await this.taskService.updateTaskByUserId(
      userId,
      taskId,
      task,
    );

    return !hasData(updated)
      ? ErrorResponse(
          updated,
          `cannot update taskId ${taskId} for userId ${userId}`,
        )
      : OkResponse(
          updated,
          `update taskId ${taskId} for userId ${userId} successfully`,
        );
  }
}
