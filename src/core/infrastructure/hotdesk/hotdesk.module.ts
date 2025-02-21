import { Module } from '@nestjs/common';
import { RegisterHotDeskService } from '../../application/hotdesk/hotdesk.service';
import { InMemoryHotDeskRepository } from './hotdesk.inmemory.repository';
import { HotDeskController } from '../../presentation/hotdesk/hotdesk.controller';
import { HOTDESK_REPOSITORY } from '../../domain/hotdesk/hotdesk.repository';
import { MEETING_ROOM_REPOSITORY } from '../../domain/meeting-room/meeting-room.repository';
import { InMemoryMeetingRoomRepository } from '../meeting-room/meeting-room.inmemory.repository';

@Module({
  controllers: [HotDeskController],
  providers: [
    RegisterHotDeskService,
    {
      provide: HOTDESK_REPOSITORY,
      useClass: InMemoryHotDeskRepository,
    },
    {
      provide: MEETING_ROOM_REPOSITORY,
      useClass: InMemoryMeetingRoomRepository,
    },
  ],
  exports: [HOTDESK_REPOSITORY, MEETING_ROOM_REPOSITORY], // Exportamos el proveedor para otros módulos
})
export class HotDeskModule {}
