import { Inject } from '@nestjs/common';
import {
  MEMBERSHIP_REPOSITORY,
  MembershipReadRepository,
} from '../../domain/membership/membership.repository';
import { InvalidMembershipUserId } from './invalid-membership-userid.error';
import { InvalidMembershipNotFoundError } from './invalid-membership-not-found.error';
import { MembershipSummaryReadModel } from './dto/membership-summary';
import { Membership } from 'src/event-sourcing/domain/membership/membership.entity';

export class GetFullMembershipSummaryQuery {
  constructor(public readonly userId: string) {}
}

export class GetFullMembershipSummaryQueryHandler {
  constructor(
    @Inject(MEMBERSHIP_REPOSITORY)
    private readonly membershipReadRepository: MembershipReadRepository,
  ) {}

  async handle(
    query: GetFullMembershipSummaryQuery,
  ): Promise<MembershipSummaryReadModel> {
    const { userId } = query;

    if (!userId) {
      throw InvalidMembershipUserId.withInvalidHotDeskNumber();
    }

    const membership = await this.membershipReadRepository.findByUserId(userId);
    if (!membership) {
      throw InvalidMembershipNotFoundError.withMembershipNotFound(userId);
    }

    return this.getReadModel(membership);
  }

  private getReadModel(membership: Membership): MembershipSummaryReadModel {
    const totalCredits = membership.membershipState.packages.reduce(
      (sum, pkg) => sum + pkg.credits,
      0,
    );

    return new MembershipSummaryReadModel(
      membership.membershipState.id.value,
      membership.membershipState.userId.value,
      totalCredits,
    );
  }
}
