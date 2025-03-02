import { BaseError } from 'src/core/exceptions/base-error.exception';

export class InvalidHotDeskReservationUserIdError extends BaseError {
  constructor(message: string) {
    super(message, 'InvalidHotDeskReservationUserIdError');
  }

  static withInvalidHotDeskUserId(): InvalidHotDeskReservationUserIdError {
    return new InvalidHotDeskReservationUserIdError(`UserId is required`);
  }
}
