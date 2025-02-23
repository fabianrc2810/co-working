import { Module } from '@nestjs/common';
import { HotDeskModule } from './core/infrastructure/hotdesk/hotdesk.module';
import { MeetingRoomModule } from './core/infrastructure/meeting-room/meeting-room.module';
import { OfficeModule } from './core/infrastructure/office/office.module';
import { ReservationModule } from './core/infrastructure/reservation/reservation.module';

@Module({
  imports: [HotDeskModule, MeetingRoomModule, OfficeModule, ReservationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
