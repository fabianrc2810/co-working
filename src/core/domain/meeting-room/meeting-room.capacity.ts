import { BadRequestException } from '@nestjs/common';

export class MeetingRoomCapacity {
  private readonly capacity: number;

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  static create(capacity: number): MeetingRoomCapacity {
    if (isNaN(capacity) || capacity <= 0) {
      throw new BadRequestException(
        'Capacity number must be a valid positive integer.',
      );
    }
    return new MeetingRoomCapacity(capacity);
  }

  value(): number {
    return this.capacity;
  }
}
