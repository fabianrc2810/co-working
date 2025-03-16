import { Injectable, Inject } from '@nestjs/common';
import { RegisterPackageCommand } from './register-package.command';

import {
  EVENT_PUBLISHER_REPOSITORY,
  EventPublisher,
} from '../../../event-sourcing/domain/event-publisher';
import {
  MEMBERSHIP_REPOSITORY,
  MembershipReadRepository,
} from '../../../event-sourcing/domain/membership/membership.repository';
import {
  MEMBERSHIP_EVENT_STORE,
  MembershipEventStore,
} from '../../../event-sourcing/domain/membership/membership.eventstore';
import { RegisterPackageError } from './register-package.exception';

@Injectable()
export class RegisterPackageCommandHandler {
  constructor(
    @Inject(EVENT_PUBLISHER_REPOSITORY)
    private readonly eventPublisher: EventPublisher,
    @Inject(MEMBERSHIP_REPOSITORY)
    private readonly membershipReadRepository: MembershipReadRepository,
    @Inject(MEMBERSHIP_EVENT_STORE)
    private readonly membershipEventStore: MembershipEventStore,
  ) {}

  async handle(command: RegisterPackageCommand): Promise<void> {
    if (!command.membershipId || command.membershipId.trim() === '') {
      throw RegisterPackageError.withInvalidMembershipId(); //badreq
    }
    if (!Number.isInteger(command.credits) || command.credits <= 0) {
      throw RegisterPackageError.withInvalidCredits(); //badreq
    }
    if (!Number.isInteger(command.year)) {
      throw RegisterPackageError.withInvalidYear(); //badreq
    }
    if (
      !Number.isInteger(command.month) ||
      command.month < 1 ||
      command.month > 12
    ) {
      throw RegisterPackageError.withInvalidMonthYear(); //badreq
    }

    const membership = await this.membershipReadRepository.findByMembershipId(
      command.membershipId,
    );
    if (!membership) {
      throw RegisterPackageError.withInvalidMembershipNotFound(
        command.membershipId,
      );
    }

    membership.subscribePackage(command.credits, command.year, command.month);

    await this.membershipEventStore.save(membership);

    this.eventPublisher.publish(membership.releaseEvents());

    await this.membershipReadRepository.updateReadModel(membership);
  }
}
