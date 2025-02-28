import { InvalidMeetingRoomNameError } from './invalid-meeting-room-name.error';

export class MeetingRoomName {
  private readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  static create(name: string): MeetingRoomName {
    if (!name) {
      throw InvalidMeetingRoomNameError.withInvalidMeetingRoomName();
    }

    return new MeetingRoomName(name);
  }

  value(): string {
    return this.name;
  }
}
