import { InvalidReservationDurationError } from './invalid-reservation-duration.error';

export class ReservationDuration {
  private readonly duration: number;

  constructor(duration: number) {
    this.duration = duration;
  }

  static create(duration: number): ReservationDuration {
    if (isNaN(duration) || duration <= 0) {
      throw InvalidReservationDurationError.withInvalidReservationDurationError(
        `Duration must be a valid positive number: '${duration}'`,
      );
    }

    if (duration < 1 || duration > 12) {
      throw InvalidReservationDurationError.withInvalidReservationDurationError(
        'Duration must be between 1 and 12.',
      );
    }

    return new ReservationDuration(duration);
  }

  value(): number {
    return this.duration;
  }
}
