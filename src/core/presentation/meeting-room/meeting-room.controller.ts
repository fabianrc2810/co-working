import { Controller, Post, Body } from '@nestjs/common';
import { MeetingRoomDTO } from 'src/core/application/meeting-room/dto/meeting-room.dto';
import { RegisterMeetingRoomService } from 'src/core/application/meeting-room/meeting-room.service';
import { MeetingRoom } from 'src/core/domain/meeting-room/meeting-room';

@Controller('meeting-rooms')
export class MeetingRoomController {
  constructor(
    private readonly registerMeetingRoom: RegisterMeetingRoomService,
  ) {}

  @Post()
  async register(
    @Body() createMeetingRoom: MeetingRoomDTO,
  ): Promise<MeetingRoom> {
    return this.registerMeetingRoom.execute(createMeetingRoom);
  }
}
