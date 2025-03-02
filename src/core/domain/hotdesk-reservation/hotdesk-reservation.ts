import { HotDeskReservationDate } from './hotdesk-reservation.date';
import { HotDeskReservationId } from './hotdesk-reservation.id';
import { HotDeskReservationStatus } from './hotdesk-reservation.status';
import { HotDeskReservationUserId } from './hotdesk-reservation.userId';

export class HotDeskReservation {
  id: HotDeskReservationId;
  userId: HotDeskReservationUserId;
  date: HotDeskReservationDate;
  status: string;
  includedInMembership: boolean;
  createdAt: string;
  updatedAt: string;

  constructor(
    userId: HotDeskReservationUserId,
    date: HotDeskReservationDate,
    includedInMembership: boolean,
  ) {
    const now = new Date().toISOString();
    this.id = HotDeskReservationId.create();
    this.userId = userId;
    this.date = date;
    this.status = HotDeskReservationStatus.getActive();
    this.includedInMembership = includedInMembership;
    this.createdAt = now;
    this.updatedAt = now;
  }
}
