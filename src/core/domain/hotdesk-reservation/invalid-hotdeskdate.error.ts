import { BaseError } from 'src/core/exceptions/base-error.exception';

export class InvalidHotDeskReservationDateError extends BaseError {
  constructor(message: string) {
    super(message, 'InvalidHotDeskReservationDateError');
  }

  static withInvalidHotDeskDate(): InvalidHotDeskReservationDateError {
    return new InvalidHotDeskReservationDateError(
      `Invalid date format. Expected YYYY-MM-DD`,
    );
  }
}
