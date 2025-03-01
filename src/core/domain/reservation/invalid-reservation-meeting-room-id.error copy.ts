import { BaseError } from 'src/core/exceptions/base-error.exception';

export class InvalidReservationMeetingRoomIdError extends BaseError {
  constructor(message: string) {
    super(message, 'InvalidReservationMeetingRoomIdError');
  }

  static withInvalidReservationMeetingRoomIdError(): InvalidReservationMeetingRoomIdError {
    return new InvalidReservationMeetingRoomIdError(
      'Meeting room id is required',
    );
  }
}
