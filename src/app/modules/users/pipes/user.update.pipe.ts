import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateUserDTO } from '../dto/user.dto';

@Injectable()
export class UpdateUserBodyValidationPipe implements PipeTransform {
  async transform(value: any) {
    const updateUserDTO = plainToClass(UpdateUserDTO, value);
    const errors = await validate(updateUserDTO);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return updateUserDTO;
  }
}
