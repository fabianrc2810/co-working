import { ReservationDate } from './reservation.date';
import { ReservationDuration } from './reservation.duration';
import { ReservationHour } from './reservation.hour';
import { ReservationId } from './reservation.id';
import { ReservationStatus } from './reservation.status';
import { ReservationUserId } from './reservation.userid';

export class Reservation {
  id: ReservationId;
  meetingRoomId: string;
  userId: ReservationUserId;
  date: ReservationDate;
  hour: ReservationHour;
  duration: ReservationDuration;
  status: ReservationStatus;
  createdAt: string;
  updatedAt: string;

  constructor(
    meetingRoomId: string,
    userId: ReservationUserId,
    date: string,
    hour: number,
    duration: number,
  ) {
    this.id = ReservationId.create();
    this.meetingRoomId = meetingRoomId;
    this.userId = userId;
    this.date = ReservationDate.create(date);
    this.hour = ReservationHour.create(hour);
    this.duration = ReservationDuration.create(duration);
    this.status = ReservationStatus.getActive();
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  get(): this {
    return this;
  }
}
