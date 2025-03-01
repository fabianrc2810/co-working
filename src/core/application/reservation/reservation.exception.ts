import { ReservationMeetingRoomId } from 'src/core/domain/reservation/reservation.meeting-room-id';
import { BaseError } from 'src/core/exceptions/base-error.exception';

export class ReservationError extends BaseError {
  constructor(message: string) {
    super(message, 'ReservationError');
  }

  static withMeetingRoomByIdNotFound(
    meetingRoomId: ReservationMeetingRoomId,
  ): ReservationError {
    return new ReservationError(
      `MeetingRoom with id '${meetingRoomId.value()}' not found`,
    );
  }

  static withMeetingRoomIsOverlapping(): ReservationError {
    return new ReservationError(
      `There is already an active reserve that overlaps with the requested time slot`,
    );
  }
}
