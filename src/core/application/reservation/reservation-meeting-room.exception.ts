import { ReservationMeetingRoomId } from 'src/core/domain/reservation/reservation.meeting-room-id';
import { BaseError } from 'src/core/exceptions/base-error.exception';

export class ReservationMeetingRoomError extends BaseError {
  constructor(message: string) {
    super(message, 'ReservationError');
  }

  static withMeetingRoomByIdNotFound(
    meetingRoomId: ReservationMeetingRoomId,
  ): ReservationMeetingRoomError {
    return new ReservationMeetingRoomError(
      `MeetingRoom with id '${meetingRoomId.value()}' not found`,
    );
  }
}
