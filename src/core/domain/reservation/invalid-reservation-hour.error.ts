import { BaseError } from 'src/core/exceptions/base-error.exception';

export class InvalidReservationHourError extends BaseError {
  constructor(message: string) {
    super(message, 'InvalidReservationHourError');
  }

  static withInvalidReservationHourError(
    message: string,
  ): InvalidReservationHourError {
    return new InvalidReservationHourError(message);
  }
}
