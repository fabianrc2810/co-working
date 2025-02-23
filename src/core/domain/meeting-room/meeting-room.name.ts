export class MeetingRoomName {
  private readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  static create(name: string): MeetingRoomName {
    return new MeetingRoomName(name);
  }

  value(): string {
    return this.name;
  }
}
