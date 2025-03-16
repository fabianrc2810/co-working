import { PackageSubscribedEvent } from '../package/package-subscribed.event';
import { PackageId } from '../package/package.id';
import { MembershipCreatedEvent } from './membership-created.event';
import { MembershipUserId } from './membership-userid';
import { MembershipStatus } from './membership.status';
import { MembershipId } from './membership.id';
import { MembershipPackage } from '../package/membership-package';

export class MembershipState {
  constructor(
    readonly id: MembershipId,
    readonly userId: MembershipUserId,
    readonly status: MembershipStatus,
    readonly active: boolean,
    readonly createdAt: Date,
    readonly packages: MembershipPackage[] = [],
  ) {}

  static empty(): MembershipState {
    return new MembershipState(
      MembershipId.empty(),
      MembershipUserId.empty(),
      MembershipStatus.empty(),
      true,
      new Date(),
      [],
    );
  }

  whenMembershipCreatedEvent(event: MembershipCreatedEvent): MembershipState {
    return new MembershipState(
      event.id,
      MembershipUserId.create(event.payload.userId),
      MembershipStatus.completed(),
      true,
      event.payload.createdAt,
      [],
    );
  }

  whenPackageSubscribedEvent(event: PackageSubscribedEvent): MembershipState {
    const newPackage = new MembershipPackage(
      PackageId.create(event.payload.packageId),
      event.payload.credits,
      event.payload.startDate,
      event.payload.endDate,
    );
    return new MembershipState(
      this.id,
      this.userId,
      this.status,
      this.active,
      this.createdAt,
      [...this.packages, newPackage],
    );
  }
}
