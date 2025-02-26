import { Module } from '@nestjs/common';
import { ReservationService } from 'src/core/application/reservation/reservation.service';
import { RESERVATION_REPOSITORY } from 'src/core/domain/reservation/reservation.repository';
import { ReservationController } from 'src/core/presentation/reservation/reservation.controller';
import { InMemoryReservation } from './reservation.inmemory.repository';
import { MeetingRoomModule } from '../meeting-room/meeting-room.module';

@Module({
  controllers: [ReservationController],
  imports: [MeetingRoomModule],
  providers: [
    ReservationService,
    {
      provide: RESERVATION_REPOSITORY,
      useClass: InMemoryReservation,
    },
  ],
  exports: [RESERVATION_REPOSITORY],
})
export class ReservationModule {}
