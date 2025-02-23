import { BadRequestException } from '@nestjs/common';
import { MeetingRoomRepository } from './meeting-room.repository';

export class MeetingRoomNameValid {
  constructor(private readonly meetingRoomRepository: MeetingRoomRepository) {}

  async check(name: string): Promise<void> {
    if (!name) {
      throw new BadRequestException('Name is required');
    }
    await this.meetingRoomRepository.checkName(name);
  }
}
