import { MeetingRoomName } from './meeting-room.name';
import { MeetingRoomRepository } from './meeting-room.repository';
import { HttpConflictException } from '../http/conflict.exception';

export class MeetingRoomExists {
  constructor(private readonly meetingRoomRepository: MeetingRoomRepository) {}

  async check(name: MeetingRoomName): Promise<void> {
    const exists = await this.meetingRoomRepository.exists(name);
    if (exists) {
      throw new HttpConflictException('MeetingRoom name already exists.');
    }
  }
}
