import { InvalidReservationUserError } from './invalid-reservation-user.error';

export class ReservationUserId {
  private readonly id: string;

  constructor(id: string) {
    this.id = id;
  }

  static create(userId: string): ReservationUserId {
    if (!userId) {
      throw InvalidReservationUserError.withInvalidReservationUserError();
    }

    return new ReservationUserId(userId);
  }

  value(): string {
    return this.id;
  }
}
