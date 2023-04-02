import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateNewTaskDTO } from '../dto/task.dto';

@Injectable()
export class CreateTaskBodyValidationPipe implements PipeTransform {
  async transform(value: any) {
    const createNewTaskDTO = plainToClass(CreateNewTaskDTO, value);
    const errors = await validate(createNewTaskDTO);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return createNewTaskDTO;
  }
}
