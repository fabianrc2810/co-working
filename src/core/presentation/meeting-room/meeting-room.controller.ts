/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Controller, Post, Body } from '@nestjs/common';
import { MeetingRoomDTO } from 'src/core/application/meeting-room/dto/meeting-room.dto';
import { CreateHotDeskCommandHandler } from 'src/core/application/meeting-room/createmeeting-room.command-handler';
import { CommandHandlerResponse } from 'src/core/application/command-handler.response';

@Controller('meeting-rooms')
export class MeetingRoomController {
  constructor(
    private readonly registerMeetingRoom: CreateHotDeskCommandHandler,
  ) {}

  @Post()
  async register(
    @Body() createMeetingRoom: MeetingRoomDTO,
  ): Promise<CommandHandlerResponse> {
    try {
      const result = await this.registerMeetingRoom.handle(createMeetingRoom);
      return result;
    } catch (error) {
      throw CommandHandlerResponse.throwError(error);
    }
  }
}
