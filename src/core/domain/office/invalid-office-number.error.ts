import { BaseError } from 'src/core/exceptions/base-error.exception';

export class InvalidOfficeNumberError extends BaseError {
  constructor(message: string) {
    super(message, 'InvalidOfficeNumberError');
  }

  static withInvalidOfficeNumber(number: number): InvalidOfficeNumberError {
    return new InvalidOfficeNumberError(
      `Number must be a valid positive integer: '${number}'`,
    );
  }
}
