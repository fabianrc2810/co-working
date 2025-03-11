import { Inject, Injectable } from '@nestjs/common';
import { CreateMembershipCommand } from './create-membership.command';
import { MembershipUserId } from 'src/event-sourcing/domain/membership/membership-userid';
import { Membership } from 'src/event-sourcing/domain/membership/membership.entity';
import {
  EVENT_PUBLISHER_REPOSITORY,
  EventPublisher,
} from 'src/event-sourcing/domain/event-publisher';
import {
  MEMBERSHIP_REPOSITORY,
  MembershipReadRepository,
} from 'src/event-sourcing/domain/membership/membership.repository';
import {
  MEMBERSHIP_EVENT_STORE,
  MembershipEventStore,
} from 'src/event-sourcing/domain/membership/membership.eventstore';
import { InvalidMembershipUserId } from './invalid-membership-userid.error';
import { InvalidMembershipError } from './invalid-membership.error';

@Injectable()
export class CreateMembershipCommandHandler {
  constructor(
    @Inject(EVENT_PUBLISHER_REPOSITORY)
    private readonly eventPublisher: EventPublisher,
    @Inject(MEMBERSHIP_REPOSITORY)
    private readonly membershipReadRepository: MembershipReadRepository,
    @Inject(MEMBERSHIP_EVENT_STORE)
    private readonly membershipEventStore: MembershipEventStore,
  ) {}

  async handle(command: CreateMembershipCommand): Promise<void> {
    if (!command.userId || command.userId.trim() === '') {
      throw InvalidMembershipUserId.withInvalidHotDeskNumber();
    }

    const existingMembership = await this.membershipReadRepository.findByUserId(
      command.userId,
    );
    if (existingMembership) {
      throw InvalidMembershipError.withInvalidHotDeskNumber(command.userId);
    }

    const membership = Membership.createStarted(
      MembershipUserId.create(command.userId),
    );

    await this.membershipEventStore.save(membership);

    this.eventPublisher.publish(membership.releaseEvents());

    await this.membershipReadRepository.updateReadModel(membership);
  }
}
