import { InvalidMeetingRoomCapacityError } from './invalid-meeting-room-capacity.error';

export class MeetingRoomCapacity {
  private readonly capacity: number;

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  static create(capacity: number): MeetingRoomCapacity {
    if (isNaN(capacity) || capacity <= 0) {
      throw InvalidMeetingRoomCapacityError.withInvalidMeetingRoomCapacity(
        capacity,
      );
    }
    return new MeetingRoomCapacity(capacity);
  }

  value(): number {
    return this.capacity;
  }
}
