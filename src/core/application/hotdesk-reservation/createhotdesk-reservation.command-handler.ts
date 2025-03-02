import { HotDeskReservation } from 'src/core/domain/hotdesk-reservation/hotdesk-reservation';
import {
  HOTDESK_RESERVATION_REPOSITORY,
  HotDeskReservationRepository,
} from 'src/core/domain/hotdesk-reservation/hotdesk-reservation.repository';
import { HotDeskReservationDto } from './dto/hotdesk-reservation';
import { HotDeskReservationUserId } from 'src/core/domain/hotdesk-reservation/hotdesk-reservation.userId';
import { HotDeskReservationDate } from 'src/core/domain/hotdesk-reservation/hotdesk-reservation.date';
import { HotDeskReservationException } from './hotdesk-reservation.exception';
import { Inject } from '@nestjs/common';
import { MembershipRepository } from 'src/core/domain/membership/membership.repository';

export class CreateHotDeskReservationCommandHandler {
  constructor(
    @Inject(HOTDESK_RESERVATION_REPOSITORY)
    private readonly hotDeskReservationRepository: HotDeskReservationRepository,
    @Inject('MEMBERSHIP_SERVICE')
    private readonly membershipService: MembershipRepository,
  ) {}

  async handle(
    createHotDeskReservationCommand: HotDeskReservationDto,
  ): Promise<void> {
    const hotDeskUserId = HotDeskReservationUserId.create(
      createHotDeskReservationCommand.userId,
    );

    const hotDeskDate = HotDeskReservationDate.create(
      createHotDeskReservationCommand.date,
    );

    const existing =
      await this.hotDeskReservationRepository.findByUserIdAndDate(
        createHotDeskReservationCommand.userId,
        createHotDeskReservationCommand.date,
      );
    if (existing) {
      throw HotDeskReservationException.withHotDeskReservationFull();
    }

    const membershipInfo = await this.membershipService.getMembershipInfo(
      createHotDeskReservationCommand.userId,
      createHotDeskReservationCommand.date,
    );
    const includedInMembership = membershipInfo.remainingCredits > 0;

    const reservation = new HotDeskReservation(
      hotDeskUserId,
      hotDeskDate,
      includedInMembership,
    );
    await this.hotDeskReservationRepository.save(reservation);
  }
}
