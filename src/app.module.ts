import { Module } from '@nestjs/common';
import { HotDeskModule } from './core/infrastructure/hotdesk/hotdesk.module';
import { MeetingRoomModule } from './core/infrastructure/meeting-room/meeting-room.module';
import { OfficeModule } from './core/infrastructure/office/office.module';
import { ReservationModule } from './core/infrastructure/reservation/reservation.module';
import { HotDeskReservationModule } from './core/infrastructure/hotdesk-reservation/hotdesk-reservation.module';
import { MembershipModule } from './event-sourcing/infrastructure/membership/membership.module';

@Module({
  imports: [
    HotDeskModule,
    MeetingRoomModule,
    OfficeModule,
    ReservationModule,
    HotDeskReservationModule,
    MembershipModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
