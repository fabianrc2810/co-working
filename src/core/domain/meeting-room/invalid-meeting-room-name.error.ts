export class InvalidMeetingRoomNameError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'InvalidMeetingRoomNameError';
    this.statusCode = statusCode;
  }

  static withInvalidMeetingRoomName(): InvalidMeetingRoomNameError {
    return new InvalidMeetingRoomNameError('Name is required', 400);
  }
}
