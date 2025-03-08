import { Membership } from './membership.entity';
export const MEMBERSHIP_EVENT_STORE = 'MembershipEventStore';

export interface MembershipEventStore {
  save(membership: Membership): Promise<void>;
}
