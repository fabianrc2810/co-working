import { InvalidReservationDateError } from './invalid-reservation-date.error';

export class ReservationDate {
  private readonly date: string;

  constructor(date: string) {
    this.date = date;
  }

  static create(date: string): ReservationDate {
    if (!date) {
      throw InvalidReservationDateError.withInvalidReservationDateError(
        'Date is required.',
      );
    }

    if (isNaN(Date.parse(date))) {
      throw InvalidReservationDateError.withInvalidReservationDateError(
        `Date must be a valid date: '${date}'`,
      );
    }

    if (new Date(date) < new Date()) {
      throw InvalidReservationDateError.withInvalidReservationDateError(
        `Date must be a future date: '${date}'`,
      );
    }

    return new ReservationDate(date);
  }

  value(): string {
    return this.date;
  }
}
