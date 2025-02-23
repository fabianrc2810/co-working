import { Id } from '../id';

export class ReservationId extends Id {
  static create(): string {
    return ReservationId.generate();
  }
}
