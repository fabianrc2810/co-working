import { Id } from '../id';

export class HotDeskReservationId extends Id {
  static create(): string {
    return HotDeskReservationId.generate();
  }
}
