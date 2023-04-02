import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

@ValidatorConstraint({ name: 'ethAddress', async: false })
export class EthAddressValidator implements ValidatorConstraintInterface {
  validate(address: string, args: ValidationArguments) {
    return ETH_ADDRESS_REGEX.test(address);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Invalid Ethereum address format';
  }
}
