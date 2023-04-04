import { IsNumber, IsBoolean, IsDate, IsOptional } from 'class-validator';

export class CreateNewTaskDTO {
  @IsNumber()
  userId: number;

  @IsNumber()
  questId: number;
}

export class NewTask {
  @IsNumber()
  userId: number;

  @IsNumber()
  questId: number;

  @IsNumber()
  pointEarned: number;

  @IsBoolean()
  completed: boolean;
}

export class UpdateTaskDTO {
  @IsNumber()
  pointEarned: number;

  @IsDate()
  @IsOptional()
  completedDate?: Date;

  @IsBoolean()
  completed: boolean;
}
