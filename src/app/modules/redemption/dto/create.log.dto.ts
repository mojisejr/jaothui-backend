import {
  IsNumber,
  IsString,
  IsBoolean,
  IsDate,
  IsOptional,
} from 'class-validator';

export class CreateRedemptionLogDTO {
  @IsNumber()
  userId: number;

  @IsNumber()
  itemId: number;

  @IsString()
  @IsOptional()
  address?: string;

  @IsBoolean()
  @IsOptional()
  received?: boolean;

  @IsDate()
  @IsOptional()
  redeemAt?: Date;
}
