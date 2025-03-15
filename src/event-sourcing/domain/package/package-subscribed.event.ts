import { DomainEvent } from '../../domain/domain-event';
import { MembershipId } from '../membership/membership.id';
import { PackageId } from './package.id';

export type PackageSubscribedPayload = {
  readonly packageId: string;
  readonly credits: number;
  readonly startDate: Date;
  readonly endDate: Date;
};

export class PackageSubscribedEvent extends DomainEvent<PackageSubscribedPayload> {
  static readonly type = 'PackageSubscribed';

  private constructor(id: MembershipId, payload: PackageSubscribedPayload) {
    super(id, PackageSubscribedEvent.type, payload);
  }

  static with(
    membershipId: MembershipId,
    packageId: PackageId,
    credits: number,
    startDate: Date,
    endDate: Date,
  ): PackageSubscribedEvent {
    return new PackageSubscribedEvent(membershipId, {
      packageId: packageId.value,
      credits,
      startDate,
      endDate,
    });
  }
}
