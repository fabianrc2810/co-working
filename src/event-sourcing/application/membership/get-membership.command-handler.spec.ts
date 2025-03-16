/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing';
import {
  GetFullMembershipSummaryQueryHandler,
  GetFullMembershipSummaryQuery,
} from './get-membership.command-handler';
import {
  MEMBERSHIP_REPOSITORY,
  MembershipReadRepository,
} from '../../../event-sourcing/domain/membership/membership.repository';
import { InvalidMembershipUserId } from './invalid-membership-userid.error';
import { InvalidMembershipNotFoundError } from './invalid-membership-not-found.error';

describe('GetFullMembershipSummaryQueryHandler', () => {
  let handler: GetFullMembershipSummaryQueryHandler;
  let membershipReadRepository: MembershipReadRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetFullMembershipSummaryQueryHandler,
        {
          provide: MEMBERSHIP_REPOSITORY,
          useValue: {
            findByUserId: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<GetFullMembershipSummaryQueryHandler>(
      GetFullMembershipSummaryQueryHandler,
    );
    membershipReadRepository = module.get<MembershipReadRepository>(
      MEMBERSHIP_REPOSITORY,
    );
  });

  describe('handle', () => {
    it('should throw InvalidMembershipUserId if userId is invalid', async () => {
      const query = new GetFullMembershipSummaryQuery('');

      await expect(handler.handle(query)).rejects.toThrow(
        InvalidMembershipUserId,
      );
    });

    it('should throw NotFoundException if membership is not found', async () => {
      const query = new GetFullMembershipSummaryQuery('valid-user-id');
      jest
        .spyOn(membershipReadRepository, 'findByUserId')
        .mockResolvedValue(null);

      await expect(handler.handle(query)).rejects.toThrow(
        InvalidMembershipNotFoundError,
      );
    });

    it('should return the membership summary projection', async () => {
      const query = new GetFullMembershipSummaryQuery('valid-user-id');

      const mockMembership = {
        membershipState: {
          id: { value: 'membership-id' },
          userId: { value: 'valid-user-id' },
          packages: [{ credits: 10 }, { credits: 20 }, { credits: 30 }],
        },
      };

      jest
        .spyOn(membershipReadRepository, 'findByUserId')
        .mockResolvedValue(mockMembership as any);

      const result = await handler.handle(query);

      expect(result).toEqual({
        id: 'membership-id',
        userId: 'valid-user-id',
        totalCredits: 60,
      });
    });
  });
});
