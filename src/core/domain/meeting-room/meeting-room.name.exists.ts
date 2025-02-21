import { ConflictException } from '@nestjs/common';
import { MeetingRoomName } from './meeting-room.name';
import { MeetingRoomRepository } from './meeting-room.repository';

export class MeetingRoomExists {
  constructor(private readonly meetingRoomRepository: MeetingRoomRepository) {}

  async check(name: MeetingRoomName): Promise<void> {
    const exists = await this.meetingRoomRepository.exists(name);
    if (exists) {
      throw new ConflictException('MeetingRoom name already exists.');
    }
  }
}
