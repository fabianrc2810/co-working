export class MeetingRoomCapacity {
  private readonly capacity: number;

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  static create(capacity: number): MeetingRoomCapacity {
    if (isNaN(capacity)) {
      throw new Error('Value must to be a number.');
    }
    return new MeetingRoomCapacity(capacity);
  }

  value(): number {
    return this.capacity;
  }
}
