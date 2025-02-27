/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { MeetingRoomDTO } from 'src/core/application/meeting-room/dto/meeting-room.dto';
import { CreateHotDeskCommandHandler } from 'src/core/application/meeting-room/createmeeting-room.command-handler';
import { HttpResponse } from 'src/core/application/http-response';

@Controller('meeting-rooms')
export class MeetingRoomController {
  constructor(
    private readonly registerMeetingRoom: CreateHotDeskCommandHandler,
  ) {}

  @Post()
  async register(
    @Body() createMeetingRoom: MeetingRoomDTO,
  ): Promise<HttpResponse> {
    try {
      const result = await this.registerMeetingRoom.handle(createMeetingRoom);
      return result;
    } catch (error) {
      throw new HttpException(
        error instanceof Error ? error['response'] : JSON.stringify(error),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        error['status'] || 500,
      );
    }
  }
}
