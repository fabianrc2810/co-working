import { Inject } from '@nestjs/common';
import {
  MEMBERSHIP_REPOSITORY,
  MembershipReadRepository,
} from '../../domain/membership/membership.repository';
import { InvalidMembershipUserId } from './invalid-membership-userid.error';
import { InvalidMembershipError } from './invalid-membership.error';

export class GetFullMembershipSummaryQuery {
  constructor(public readonly userId: string) {}
}

export interface MembershipSummaryProjection {
  id: string;
  user_id: string;
  total_credits: number;
}

export class GetFullMembershipSummaryQueryHandler {
  constructor(
    @Inject(MEMBERSHIP_REPOSITORY)
    private readonly membershipReadRepository: MembershipReadRepository,
  ) {}

  async handle(
    query: GetFullMembershipSummaryQuery,
  ): Promise<MembershipSummaryProjection> {
    const { userId } = query;

    if (!userId) {
      throw InvalidMembershipUserId.withInvalidHotDeskNumber();
    }

    const membership = await this.membershipReadRepository.findByUserId(userId);
    if (!membership) {
      throw InvalidMembershipError.withMembershipNotFound(userId);
    }

    return {
      id: membership.membershipState.id.value,
      user_id: membership.membershipState.userId.value,
      total_credits: membership.membershipState.packages.reduce(
        (sum, pkg) => sum + pkg.credits,
        0,
      ),
    };
  }
}
