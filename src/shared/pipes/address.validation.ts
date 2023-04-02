import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

// export interface ArgumentMetadata {
//   type: 'body' | 'query' | 'param' | 'custom';
//   metatype?: Type<unknown>;
//   data?: string;
// }
const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

@Injectable()
export class EthAddressValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const result = ETH_ADDRESS_REGEX.test(value);
    if (!result) {
      throw new BadRequestException('Invalid Address');
    }
    return value;
  }
}
