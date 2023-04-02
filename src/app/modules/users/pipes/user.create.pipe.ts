import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserDTO } from '../dto/user.dto';

@Injectable()
export class CreateUserBodyValidationPipe implements PipeTransform {
  async transform(value: any) {
    const createUserDTO = plainToClass(CreateUserDTO, value);
    const errors = await validate(createUserDTO);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return createUserDTO;
  }
}
