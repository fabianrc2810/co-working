import { InvalidReservationMeetingRoomIdError } from './invalid-reservation-meeting-room-id.error copy';

export class ReservationMeetingRoomId {
  private readonly meetingRoomId: string;

  constructor(meetingRoomId: string) {
    this.meetingRoomId = meetingRoomId;
  }

  static create(meetingRoomId: string): ReservationMeetingRoomId {
    if (!meetingRoomId) {
      throw InvalidReservationMeetingRoomIdError.withInvalidReservationMeetingRoomIdError();
    }

    return new ReservationMeetingRoomId(meetingRoomId);
  }

  value(): string {
    return this.meetingRoomId;
  }
}
