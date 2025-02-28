/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Controller, Post, Body } from '@nestjs/common';
import { MeetingRoomDTO } from 'src/core/application/meeting-room/dto/meeting-room.dto';
import { CreateHotDeskCommandHandler } from 'src/core/application/meeting-room/createmeeting-room.command-handler';
import { ErrorResponseFactory } from '../error-response-factory';

@Controller('meeting-rooms')
export class MeetingRoomController {
  constructor(
    private readonly registerMeetingRoom: CreateHotDeskCommandHandler,
  ) {}

  @Post()
  async register(@Body() request: MeetingRoomDTO): Promise<MeetingRoomDTO> {
    try {
      await this.registerMeetingRoom.handle(request);
      return request;
    } catch (error) {
      throw ErrorResponseFactory.create(error);
    }
  }
}
