import { DomainEvent } from '../../domain/domain-event';
import { EventSourcedEntity } from '../event-sourced.entity';
import { Id } from '../id';
import { MembershipCreatedEvent } from './membership-created.event';
import { MembershipState } from './membership-state';
import { MembershipUserId } from './membership-userid';
import { MembershipStatus } from './membership.status';
import { MembershipId } from './mermbership.id';

export class Membership extends EventSourcedEntity {
  private membershipState: MembershipState;

  private constructor(stream: Array<DomainEvent> = []) {
    super(stream);
    if (stream.length === 0) {
      this.membershipState = MembershipState.empty();
    }
  }

  protected when(e: DomainEvent): void {
    if (e.type === MembershipCreatedEvent.type) {
      this.whenMembershipCreatedEvent(e as unknown as MembershipCreatedEvent);
    } else {
      throw new Error('Unknown event type');
    }
  }

  private whenMembershipCreatedEvent(event: MembershipCreatedEvent) {
    this.membershipState =
      this.membershipState.whenMembershipCreatedEvent(event);
  }

  static create(stream: Array<DomainEvent>): Membership {
    return new Membership(stream);
  }

  static createStarted(userId: MembershipUserId): Membership {
    const membershipId = MembershipId.create(Id.generate());
    const membership = new Membership();
    const startDate = new Date();

    membership.start(membershipId, userId, startDate);
    return membership;
  }

  start(id: MembershipId, userId: MembershipUserId, startDate: Date): void {
    this.apply(
      MembershipCreatedEvent.with(
        id,
        userId,
        MembershipStatus.completed(),
        startDate,
      ),
    );
  }
}
