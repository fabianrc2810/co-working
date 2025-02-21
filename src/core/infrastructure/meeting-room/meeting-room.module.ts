import { Module } from '@nestjs/common';
import { MEETING_ROOM_REPOSITORY } from '../../domain/meeting-room/meeting-room.repository';
import { InMemoryMeetingRoomRepository } from '../meeting-room/meeting-room.inmemory.repository';
import { RegisterMeetingRoomService } from 'src/core/application/meeting-room/meeting-room.service';
import { MeetingRoomController } from 'src/core/presentation/meeting-room/meeting-room.controller';

@Module({
  controllers: [MeetingRoomController],
  providers: [
    RegisterMeetingRoomService,
    {
      provide: MEETING_ROOM_REPOSITORY,
      useClass: InMemoryMeetingRoomRepository,
    },
  ],
  exports: [MEETING_ROOM_REPOSITORY],
})
export class MeetingRoomModule {}
