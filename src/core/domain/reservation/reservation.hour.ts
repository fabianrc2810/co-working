import { InvalidReservationHourError } from './invalid-reservation-hour.error';

export class ReservationHour {
  private readonly hour: number;

  constructor(hour: number) {
    this.hour = hour;
  }

  static create(hour: number): ReservationHour {
    if (isNaN(hour) || hour <= 0) {
      throw InvalidReservationHourError.withInvalidReservationHourError(
        'Hour value must to be a valid positive number.',
      );
    }

    if (hour < 0 || hour > 23) {
      throw InvalidReservationHourError.withInvalidReservationHourError(
        'Hour must be between 0 and 23.',
      );
    }

    return new ReservationHour(hour);
  }

  value(): number {
    return this.hour;
  }
}
