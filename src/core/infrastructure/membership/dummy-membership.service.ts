/* eslint-disable @typescript-eslint/no-unused-vars */
import { MembershipInfo } from 'src/core/domain/membership/membership';
import { MembershipRepository } from 'src/core/domain/membership/membership.repository';

export class DummyMembershipService implements MembershipRepository {
  async getMembershipInfo(
    _userId: string,
    _date: string,
  ): Promise<MembershipInfo> {
    return Promise.resolve({
      membershipId: 'membership-id',
      remainingCredits: 5,
    });
  }
}
