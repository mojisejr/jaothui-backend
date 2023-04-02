import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateQuestDTO } from '../dto/quest.dto';

@Injectable()
export class CreateQuestBodyValidationPipe implements PipeTransform {
  async transform(value: any) {
    const createQuestDTO = plainToClass(CreateQuestDTO, value);
    const errors = await validate(createQuestDTO);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return createQuestDTO;
  }
}
