/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { Membership } from 'src/event-sourcing/domain/membership/membership.entity';
import { MembershipEventStore } from 'src/event-sourcing/domain/membership/membership.eventstore';

export class InMemoryMembershipEventStore implements MembershipEventStore {
  private readonly eventStore: Map<string, any[]> = new Map();

  async save(membership: Membership): Promise<void> {
    const aggregateId = (membership as any).membershipState.id.value;
    this.eventStore.set(aggregateId, membership.releaseEvents());

    return Promise.resolve();
  }
}
