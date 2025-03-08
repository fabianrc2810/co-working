import { MembershipCreatedEvent } from './membership-created.event';
import { MembershipUserId } from './membership-userid';
import { MembershipStatus } from './membership.status';
import { MembershipId } from './mermbership.id';

export class MembershipState {
  constructor(
    readonly id: MembershipId,
    readonly userId: MembershipUserId,
    readonly status: MembershipStatus,
    readonly active: boolean,
    readonly createdAt: Date,
  ) {}

  static empty(): MembershipState {
    return new MembershipState(
      MembershipId.empty(),
      MembershipUserId.empty(),
      MembershipStatus.empty(),
      true,
      new Date(),
    );
  }

  whenMembershipCreatedEvent(event: MembershipCreatedEvent): MembershipState {
    return new MembershipState(
      event.id,
      MembershipUserId.create(event.payload.userId),
      MembershipStatus.completed(),
      true,
      event.payload.createdAt,
    );
  }
}
