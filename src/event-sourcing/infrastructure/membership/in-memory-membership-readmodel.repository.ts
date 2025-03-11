/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { Membership } from 'src/event-sourcing/domain/membership/membership.entity';
import { MembershipReadRepository } from 'src/event-sourcing/domain/membership/membership.repository';

export class InMemoryMembershipReadRepository
  implements MembershipReadRepository
{
  private readonly memberships: Map<string, Membership> = new Map();

  async findByMembershipId(membershipId: string): Promise<Membership | null> {
    return Promise.resolve(this.memberships.get(membershipId) || null);
  }

  async findByUserId(userId: string): Promise<Membership | null> {
    return Promise.resolve(this.memberships.get(userId) || null);
  }

  async updateReadModel(membership: Membership): Promise<void> {
    const userId = (membership as any).membershipState.userId.value;
    this.memberships.set(userId, membership);

    return Promise.resolve();
  }
}
