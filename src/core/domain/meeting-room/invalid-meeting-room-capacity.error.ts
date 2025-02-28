import { BaseError } from 'src/core/exceptions/base-error.exception';

export class InvalidMeetingRoomCapacityError extends BaseError {
  constructor(message: string) {
    super(message, 'InvalidMeetingRoomCapacityError');
  }

  static withInvalidMeetingRoomCapacity(
    capacity: number,
  ): InvalidMeetingRoomCapacityError {
    return new InvalidMeetingRoomCapacityError(
      `Capacity number must be a valid positive integer and be greater than 0: ${capacity}`,
    );
  }
}
