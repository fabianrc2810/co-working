import { BadRequestException } from '@nestjs/common';
import { MeetingRoomRepository } from './meeting-room.repository';

export class MeetingRoomCapacityValid {
  constructor(private readonly meetingRoomRepository: MeetingRoomRepository) {}

  async check(capacity: number): Promise<void> {
    if (isNaN(capacity) || capacity <= 0) {
      throw new BadRequestException(
        'Capacity number must be a valid positive integer.',
      );
    }
    await this.meetingRoomRepository.checkCapacity(capacity);
  }
}
