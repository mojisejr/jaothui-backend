import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateQuestDTO } from '../dto/quest.dto';

@Injectable()
export class UpdateQuestBodyValidationPipe implements PipeTransform {
  async transform(value: any) {
    const updateQuestDTO = plainToClass(UpdateQuestDTO, value);
    const errors = await validate(updateQuestDTO);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return updateQuestDTO;
  }
}
