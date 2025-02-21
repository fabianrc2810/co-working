import { Inject } from '@nestjs/common';
import {
  MEETING_ROOM_REPOSITORY,
  MeetingRoomRepository,
} from 'src/core/domain/meeting-room/meeting-room.repository';
import { MeetingRoomDTO } from './dto/meeting-room.dto';
import { MeetingRoom } from 'src/core/domain/meeting-room/meeting-room';
import { MeetingRoomName } from 'src/core/domain/meeting-room/meeting-room.name';
import { MeetingRoomExists } from 'src/core/domain/meeting-room/meeting-room.name.exists';
import { MeetingRoomCapacity } from 'src/core/domain/meeting-room/meeting-room.capacity';

export class RegisterMeetingRoomService {
  constructor(
    @Inject(MEETING_ROOM_REPOSITORY)
    private readonly meetingRoomRepository: MeetingRoomRepository,
  ) {}

  async execute(createMeetingRoomDto: MeetingRoomDTO): Promise<MeetingRoom> {
    const meetingRoomName = MeetingRoomName.create(createMeetingRoomDto.name);
    const meetingRoomCapacity = MeetingRoomCapacity.create(
      createMeetingRoomDto.capacity,
    );
    const meetingRoomExists = new MeetingRoomExists(this.meetingRoomRepository);

    await meetingRoomExists.check(meetingRoomName);
    const meetingRoom = new MeetingRoom(meetingRoomName, meetingRoomCapacity);

    return this.meetingRoomRepository.save(meetingRoom);
  }
}
