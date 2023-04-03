import { IsNumber, IsString } from 'class-validator';

export class CreateRedemptionItemDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  cost: number;
}
