import { Id } from '../id';

export class ReservationUserId extends Id {
  static create(): string {
    return ReservationUserId.generate();
  }
}
