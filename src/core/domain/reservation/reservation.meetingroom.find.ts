import { NotFoundException } from '@nestjs/common';

export class ReservationMeetingRoomFind {
  static findMeetingRoomById(status: any, meetingRoomId: string): void {
    if (!status) {
      throw new NotFoundException(
        `MeetingRoom with id ${meetingRoomId} not found`,
      );
    }
  }
}
