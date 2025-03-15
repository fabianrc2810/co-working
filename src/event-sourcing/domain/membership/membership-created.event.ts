import { DomainEvent } from '../domain-event';
import { MembershipUserId } from './membership-userid';
import { MembershipStatus } from './membership.status';
import { MembershipId } from './membership.id';

export type MembershipCreatedPayload = {
  readonly id: string;
  readonly userId: string;
  readonly status: string;
  readonly createdAt: Date;
};

export class MembershipCreatedEvent extends DomainEvent<MembershipCreatedPayload> {
  static readonly type = 'MembershipCreated';

  private constructor(id: MembershipId, payload: MembershipCreatedPayload) {
    super(id, MembershipCreatedEvent.type, payload);
  }

  static with(
    id: MembershipId,
    userId: MembershipUserId,
    status: MembershipStatus,
    createdAt: Date,
  ): MembershipCreatedEvent {
    return new MembershipCreatedEvent(id, {
      id: id.value,
      userId: userId.value,
      status: status.value,
      createdAt,
    });
  }
}
