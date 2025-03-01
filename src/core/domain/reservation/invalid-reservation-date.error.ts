import { BaseError } from 'src/core/exceptions/base-error.exception';

export class InvalidReservationDateError extends BaseError {
  constructor(message: string) {
    super(message, 'InvalidReservationDateError');
  }

  static withInvalidReservationDateError(
    message: string,
  ): InvalidReservationDateError {
    return new InvalidReservationDateError(message);
  }
}
