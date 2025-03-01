import { BaseError } from 'src/core/exceptions/base-error.exception';

export class InvalidReservationDurationError extends BaseError {
  constructor(message: string) {
    super(message, 'InvalidReservationDurationError');
  }

  static withInvalidReservationDurationError(
    message: string,
  ): InvalidReservationDurationError {
    return new InvalidReservationDurationError(message);
  }
}
