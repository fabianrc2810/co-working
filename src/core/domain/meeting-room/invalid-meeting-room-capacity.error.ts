export class InvalidMeetingRoomCapacityError extends Error {
  static withInvalidMeetingRoomCapacity(
    capacity: number,
  ): InvalidMeetingRoomCapacityError {
    return new InvalidMeetingRoomCapacityError(
      `Capacity number must be a valid positive integer: ${capacity}`,
    );
  }
}
