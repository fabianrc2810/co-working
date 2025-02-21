export class MeetingRoomName {
  private readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  static create(name: string): MeetingRoomName {
    if (name.trim().length === 0) {
      throw new Error('Invalid name provided.');
    }
    return new MeetingRoomName(name);
  }

  value(): string {
    return this.name;
  }
}
