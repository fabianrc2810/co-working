import { MembershipInfo } from './membership';

export interface MembershipRepository {
  getMembershipInfo(userId: string, date: string): Promise<MembershipInfo>;
}
