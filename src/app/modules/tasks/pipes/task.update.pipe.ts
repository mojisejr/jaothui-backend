import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateTaskDTO } from '../dto/task.dto';

@Injectable()
export class UpdateTaskBodyValidationPipe implements PipeTransform {
  async transform(value: any) {
    const updateTaskDTO = plainToClass(UpdateTaskDTO, value);
    const errors = await validate(updateTaskDTO);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return updateTaskDTO;
  }
}
