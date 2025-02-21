import { Module } from '@nestjs/common';
import { HotDeskModule } from './core/infrastructure/hotdesk/hotdesk.module';
import { MeetingRoomModule } from './core/infrastructure/meeting-room/meeting-room.module';

@Module({
  imports: [HotDeskModule, MeetingRoomModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
