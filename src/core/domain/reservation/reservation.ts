import { ReservationDate } from './reservation.date';
import { ReservationDuration } from './reservation.duration';
import { ReservationHour } from './reservation.hour';
import { ReservationId } from './reservation.id';
import { ReservationMeetingRoomId } from './reservation.meeting-room-id';
import { ReservationStatus } from './reservation.status';
import { ReservationUserId } from './reservation.userid';

export class Reservation {
  id: ReservationId;
  meetingRoomId: ReservationMeetingRoomId;
  userId: ReservationUserId;
  date: ReservationDate;
  hour: ReservationHour;
  duration: ReservationDuration;
  status: ReservationStatus;
  createdAt: string;
  updatedAt: string;

  constructor(
    meetingRoomId: ReservationMeetingRoomId,
    userId: ReservationUserId,
    date: ReservationDate,
    hour: ReservationHour,
    duration: ReservationDuration,
  ) {
    this.id = ReservationId.create();
    this.meetingRoomId = meetingRoomId;
    this.userId = userId;
    this.date = date;
    this.hour = hour;
    this.duration = duration;
    this.status = ReservationStatus.getActive();
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  get(): this {
    return this;
  }
}
