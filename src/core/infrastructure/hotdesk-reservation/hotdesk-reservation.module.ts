import { Module } from '@nestjs/common';
import { CreateHotDeskReservationCommandHandler } from 'src/core/application/hotdesk-reservation/createhotdesk-reservation.command-handler';
import { HOTDESK_RESERVATION_REPOSITORY } from 'src/core/domain/hotdesk-reservation/hotdesk-reservation.repository';
import { InMemoryHotDeskReservationRepository } from './hotdesk-reservation.inmemory.repository';
import { HotDeskReservationController } from 'src/core/presentation/hotdesk-reservation/hotdesk-reservation.controller';
import { DummyMembershipService } from '../membership/dummy-membership.service';

@Module({
  controllers: [HotDeskReservationController],
  providers: [
    CreateHotDeskReservationCommandHandler,
    {
      provide: HOTDESK_RESERVATION_REPOSITORY,
      useClass: InMemoryHotDeskReservationRepository,
    },
    {
      provide: 'MEMBERSHIP_SERVICE',
      useClass: DummyMembershipService,
    },
  ],
  exports: [HOTDESK_RESERVATION_REPOSITORY],
})
export class HotDeskReservationModule {}
