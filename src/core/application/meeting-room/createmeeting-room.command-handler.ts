import { Inject } from '@nestjs/common';
import {
  MEETING_ROOM_REPOSITORY,
  MeetingRoomRepository,
} from 'src/core/domain/meeting-room/meeting-room.repository';
import { MeetingRoomDTO } from './dto/meeting-room.dto';
import { MeetingRoom } from 'src/core/domain/meeting-room/meeting-room';
import { MeetingRoomName } from 'src/core/domain/meeting-room/meeting-room.name';
import { MeetingRoomCapacity } from 'src/core/domain/meeting-room/meeting-room.capacity';
import { MeetingRoomDuplicatedException } from './meeting-room.exception';

export class CreateHotDeskCommandHandler {
  constructor(
    @Inject(MEETING_ROOM_REPOSITORY)
    private readonly meetingRoomRepository: MeetingRoomRepository,
  ) {}

  async handle(createMeetingRoomCommand: MeetingRoomDTO): Promise<void> {
    const meetingRoomName = MeetingRoomName.create(
      createMeetingRoomCommand.name,
    );
    const meetingRoomCapacity = MeetingRoomCapacity.create(
      createMeetingRoomCommand.capacity,
    );

    const exists = await this.meetingRoomRepository.exists(meetingRoomName);
    if (exists) {
      throw MeetingRoomDuplicatedException.withHotDeskNumber(meetingRoomName);
    }

    const meetingRoom = new MeetingRoom(meetingRoomName, meetingRoomCapacity);

    await this.meetingRoomRepository.save(meetingRoom);
  }
}
