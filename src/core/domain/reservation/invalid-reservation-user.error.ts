import { BaseError } from 'src/core/exceptions/base-error.exception';

export class InvalidReservationUserError extends BaseError {
  constructor(message: string) {
    super(message, 'InvalidReservationUserError');
  }

  static withInvalidReservationUserError(): InvalidReservationUserError {
    return new InvalidReservationUserError('User is required');
  }
}
