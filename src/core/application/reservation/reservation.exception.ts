import { BaseError } from 'src/core/exceptions/base-error.exception';

export class ReservationError extends BaseError {
  constructor(message: string) {
    super(message, 'ReservationError');
  }

  static withMeetingRoomIsOverlapping(): ReservationError {
    return new ReservationError(
      `There is already an active reserve that overlaps with the requested time slot`,
    );
  }

  static withMeetingRoomValidateReservationTime(
    nextAvailableHour: number,
  ): ReservationError {
    return new ReservationError(
      `The reservation for the current day must have an hour greater than or equal to '${nextAvailableHour}'`,
    );
  }
}
