import { Id } from '../id';

export class MeetingRoomId extends Id {
  static create(): string {
    return MeetingRoomId.generate();
  }
}
