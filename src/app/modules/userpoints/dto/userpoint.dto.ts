import { IsNumber } from 'class-validator';

export class CreateUserPointDTO {
  @IsNumber()
  userId: number;
}

export class UpdateUserPointDTO {
  @IsNumber()
  points: number;
}
