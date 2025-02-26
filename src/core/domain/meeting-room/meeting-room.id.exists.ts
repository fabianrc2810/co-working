import { BadRequestException } from '@nestjs/common';
import { MeetingRoomRepository } from './meeting-room.repository';

export class MeetingRoomIdExists {
  constructor(private readonly meetingRoomRepository: MeetingRoomRepository) {}

  async findById(id: string): Promise<void> {
    const result = await this.meetingRoomRepository.findById(id);
    if (!result) {
      throw new BadRequestException(`MeetingRoom with id ${id} not found`);
    }
  }
}
