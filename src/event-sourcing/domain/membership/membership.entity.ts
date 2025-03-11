import { DomainEvent } from '../../domain/domain-event';
import { EventSourcedEntity } from '../event-sourced.entity';
import { Id } from '../id';
import { PackageSubscribedEvent } from '../package/package-subscribed.event';
import { PackageId } from '../package/package.id';
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
    switch (e.type) {
      case MembershipCreatedEvent.type:
        this.whenMembershipCreatedEvent(e as unknown as MembershipCreatedEvent);
        break;
      case PackageSubscribedEvent.type:
        this.whenPackageSubscribedEvent(e as PackageSubscribedEvent);
        break;
      default:
        throw new Error('Unknown event type');
    }
  }

  private whenMembershipCreatedEvent(event: MembershipCreatedEvent) {
    this.membershipState =
      this.membershipState.whenMembershipCreatedEvent(event);
  }

  private whenPackageSubscribedEvent(event: PackageSubscribedEvent): void {
    this.membershipState =
      this.membershipState.whenPackageSubscribedEvent(event);
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

  start(id: MembershipId, userId: MembershipUserId, createdAt: Date): void {
    this.apply(
      MembershipCreatedEvent.with(
        id,
        userId,
        MembershipStatus.completed(),
        createdAt,
      ),
    );
  }

  public subscribePackage(credits: number, year: number, month: number): void {
    if (credits <= 0) {
      throw new Error('Credits must be to greater than 0');
    }
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const packageId = PackageId.create();
    this.apply(
      PackageSubscribedEvent.with(
        this.membershipState.id,
        packageId,
        credits,
        startDate,
        endDate,
      ),
    );
  }
}
