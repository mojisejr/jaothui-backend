import { IsString, IsOptional, IsNumber, Validate } from 'class-validator';
import { EthAddressValidator } from 'src/shared/validators/address.validator';

export class CreateQuestDTO {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsString()
  description: string;

  @IsNumber()
  points: number;

  @Validate(EthAddressValidator)
  @IsOptional()
  nftAddress?: string;

  @IsNumber()
  @IsOptional()
  nftRequire?: number;

  @Validate(EthAddressValidator)
  @IsOptional()
  erc20Address?: string;

  @IsNumber()
  @IsOptional()
  erc20Require?: number;
}

export class UpdateQuestDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  points?: number;

  @Validate(EthAddressValidator)
  @IsOptional()
  nftAddress?: string;

  @IsNumber()
  @IsOptional()
  nftRequire?: number;

  @Validate(EthAddressValidator)
  @IsOptional()
  erc20Address?: string;

  @IsNumber()
  @IsOptional()
  erc20Require?: number;
}
