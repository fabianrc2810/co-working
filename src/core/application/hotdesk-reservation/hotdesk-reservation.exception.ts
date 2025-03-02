import { BaseError } from 'src/core/exceptions/base-error.exception';

export class HotDeskReservationException extends BaseError {
  constructor(message: string) {
    super(message, 'HotDeskReservationException');
  }

  static withHotDeskReservationFull(): HotDeskReservationException {
    return new HotDeskReservationException(
      `User already has a HotDesk reservation for this date`,
    );
  }
}
