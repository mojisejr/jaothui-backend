import { IsString, IsEmail, IsOptional, Validate } from 'class-validator';
import { EthAddressValidator } from 'src/shared/validators/address.validator';

export class CreateUserDTO {
  @Validate(EthAddressValidator)
  walletAddress: string;

  @IsString()
  name: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  profile?: string;
}

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  profile?: string;
}
