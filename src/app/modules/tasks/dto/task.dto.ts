import { IsNumber, IsBoolean, IsDate } from 'class-validator';

export class CreateNewTaskDTO {
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
  completedDate: Date;

  @IsBoolean()
  completed: boolean;
}
