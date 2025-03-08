import { Membership } from './membership.entity';

export const MEMBERSHIP_REPOSITORY = 'MembershipReadRepository';

export interface MembershipReadRepository {
  findByUserId(userId: string): Promise<Membership | null>;
  updateReadModel(membership: Membership): Promise<void>;
}
