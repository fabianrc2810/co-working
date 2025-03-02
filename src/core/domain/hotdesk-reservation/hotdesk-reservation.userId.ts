import { InvalidHotDeskReservationUserIdError } from './invalid-hotdeskuserId.error';

export class HotDeskReservationUserId {
  private readonly userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  static create(userId: string): HotDeskReservationUserId {
    if (!userId) {
      throw InvalidHotDeskReservationUserIdError.withInvalidHotDeskUserId();
    }

    return new HotDeskReservationUserId(userId);
  }

  value(): string {
    return this.userId;
  }
}
