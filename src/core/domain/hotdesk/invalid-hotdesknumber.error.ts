import { BaseError } from 'src/core/exceptions/base-error.exception';

export class InvalidHotDeskNumberError extends BaseError {
  constructor(message: string) {
    super(message, 'InvalidHotDeskNumberError');
  }

  static withInvalidHotDeskNumber(number: number): InvalidHotDeskNumberError {
    return new InvalidHotDeskNumberError(
      `HotDesk number must be a valid positive integer: '${number}'.`,
    );
  }
}
