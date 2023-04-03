import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateRedemptionItemDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  cost?: number;
}
