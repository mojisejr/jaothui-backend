import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  ParseIntPipe,
  NotFoundException,
  ParseBoolPipe,
  BadRequestException,
  Delete,
} from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { hasData } from 'src/utils/checkNullorUndefind';
import { OkResponse } from 'src/utils/parseResponseData';
import { CreateNewTaskDTO, UpdateTaskDTO } from '../dto/task.dto';
import { ResponseData } from 'src/shared/shared.interface';
import { UserService } from '../../users/services/user.service';
import { QuestService } from '../../quests/services/quest.service';
import { CreateTaskBodyValidationPipe } from '../pipes/task.create.pipe';
import { UpdateTaskBodyValidationPipe } from '../pipes/task.update.pipe';
import { UserPointService } from '../../userpoints/services/userpoints.service';

@Controller('tasks')
export class TaskController {
  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private userPointService: UserPointService,
    private questService: QuestService,
  ) {}

  @Post()
  async createNewTask(
    @Body(CreateTaskBodyValidationPipe) task: CreateNewTaskDTO,
  ): Promise<ResponseData> {
    const user = await this.userService.findUserById(task.userId);
    const quest = await this.questService.findQuestById(task.questId);
    const hasUser = hasData(user);
    const hasQuest = hasData(quest);

    const created = await this.taskService.checkCreatedTaskByUserId(
      task.questId,
      task.userId,
    );

    if (hasUser && hasQuest && !created) {
      const result = await this.taskService.createNewTask({
        ...task,
        completed: false,
        pointEarned: quest.points,
      });
      return OkResponse(result, `create new task successfully`);
    } else if (!hasUser) {
      throw new NotFoundException(
        `userId ${task.userId} not found cannot create task`,
        { cause: new Error() },
      );
    } else if (!hasQuest) {
      throw new NotFoundException(
        `questId ${task.questId} not found cannot create task`,
        { cause: new Error() },
      );
    } else if (created) {
      throw new BadRequestException(
        `taskId ${task.questId} of userId ${task.userId} was created`,
      );
    }
  }

  @Get()
  async findAllTasks(
    @Query('completed', ParseBoolPipe) completed: boolean,
  ): Promise<ResponseData> {
    if (completed) {
      const tasks = await this.taskService.findAllCompletedTasks();

      if (!hasData(tasks)) {
        throw new NotFoundException(`findAllTasks: completed tasks not found`);
      }

      return OkResponse(tasks, `find all tasks successfully`);
    } else {
      const tasks = await this.taskService.findAllTasks();

      if (!hasData(tasks)) {
        throw new NotFoundException(`findAllTasks: tasks not found`);
      }

      return OkResponse(tasks, `find all tasks successfully`);
    }
  }

  @Get(':taskId')
  async findTaskById(
    @Param('taskId', ParseIntPipe) taskId: number,
  ): Promise<ResponseData> {
    const task = await this.taskService.findTaskById(taskId);

    if (!hasData(task)) {
      throw new NotFoundException(`findTaskById: taskId ${taskId} not found`);
    }

    return OkResponse(task, `found taskId ${taskId}`);
  }

  @Get('user/:userId')
  async findAllTasksByUserId(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('completed', ParseBoolPipe) completed: boolean,
  ) {
    try {
      if (completed) {
        const tasks = await this.taskService.findAllCompletedTaskByUserId(
          userId,
        );
        return OkResponse(tasks, `all completed by userId ${userId}`);
      } else {
        const tasks = await this.taskService.findAllTasksByUserId(userId);

        if (!hasData(tasks)) {
          throw new NotFoundException(
            `findAllTaskByUserId: tasks of userId ${userId} not found`,
          );
        }
        return OkResponse(
          tasks,
          `find all tasks of userId ${userId} successfully`,
        );
      }
    } catch (error) {
      throw new BadRequestException(
        `findAllTasksByUserId: need completed flag`,
      );
    }
  }

  @Put('/user/:userId/:taskId')
  async updateTaskByUserId(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body(UpdateTaskBodyValidationPipe) task: UpdateTaskDTO,
  ) {
    const updated = await this.taskService.updateTaskByUserId(
      userId,
      taskId,
      task,
    );

    return OkResponse(
      updated,
      `update taskId ${taskId} for userId ${userId} successfully`,
    );
  }

  @Put('/reset')
  async resetAllTasks() {
    const reset = await this.taskService.resetAllTasks();
    return OkResponse(reset, `reset all tasks successfully`);
  }

  @Put('/mark/:taskId')
  async markTaskAsCompleted(@Param('taskId', ParseIntPipe) taskId: number) {
    const task = await this.taskService.findTaskById(taskId);
    if (!hasData(task)) {
      throw new NotFoundException(
        `markTaskAsCompleted: taskId ${taskId} not found`,
      );
    }

    if (task.completed) {
      throw new BadRequestException(
        `markTaskAsCompleted: taskId is has been completed`,
      );
    }

    const quest = await this.questService.findQuestById(task.questId);
    if (!hasData(quest)) {
      throw new NotFoundException(
        `markTaskAsCompleted: questId ${task.questId} not found`,
      );
    }

    const totalPoint = task.pointEarned + quest.points;

    const marked = await this.taskService.markTaskAsCompleted(
      taskId,
      totalPoint,
    );

    const { points } = await this.userPointService.findUserPointByUserId(
      task.userId,
    );

    await this.userPointService.updateUserPoint(task.userId, {
      points: points + quest.points,
    });

    return OkResponse(marked, `marked ${taskId} as completed`);
  }

  @Delete(':taskId')
  async deleteTaskById(@Param('taskId', ParseIntPipe) taskId: number) {
    const deleted = await this.taskService.deleteTaskById(taskId);
    return OkResponse(deleted, `taskId ${taskId} deleted successfully`);
  }
}
