import { Module } from '@nestjs/common';
import { CreateReservationCommandHandler } from 'src/core/application/reservation/createreservation.command-handler';
import { RESERVATION_REPOSITORY } from 'src/core/domain/reservation/reservation.repository';
import { ReservationController } from 'src/core/presentation/reservation/reservation.controller';
import { InMemoryReservation } from './reservation.inmemory.repository';
import { MeetingRoomModule } from '../meeting-room/meeting-room.module';
import { HotDeskModule } from '../hotdesk/hotdesk.module';

@Module({
  controllers: [ReservationController],
  imports: [MeetingRoomModule, HotDeskModule],
  providers: [
    CreateReservationCommandHandler,
    {
      provide: RESERVATION_REPOSITORY,
      useClass: InMemoryReservation,
    },
  ],
  exports: [RESERVATION_REPOSITORY],
})
export class ReservationModule {}
