import { BaseError } from 'src/core/exceptions/base-error.exception';

export class InvalidMeetingRoomNameError extends BaseError {
  constructor(message: string) {
    super(message, 'InvalidMeetingRoomNameError');
  }

  static withInvalidMeetingRoomName(): InvalidMeetingRoomNameError {
    return new InvalidMeetingRoomNameError('Name is required');
  }
}
