import { Module } from '@nestjs/common';
import { CreateMembershipCommandHandler } from 'src/membership/application/membership/create-membership.command-handler';
import { InMemoryMembershipReadRepository } from './in-memory-membership-readmodel.repository';
import { InMemoryMembershipEventStore } from './in-memory-membership-event-store.repository';
import { SimpleEventPublisher } from './simple-event-publisher';
import { MembershipController } from 'src/membership/ui/membership.controller';
import { EVENT_PUBLISHER_REPOSITORY } from 'src/membership/domain/event-publisher';
import { MEMBERSHIP_REPOSITORY } from 'src/membership/domain/membership/membership.repository';
import { MEMBERSHIP_EVENT_STORE } from 'src/membership/domain/membership/membership.eventstore';

@Module({
  controllers: [MembershipController],
  providers: [
    CreateMembershipCommandHandler,
    { provide: EVENT_PUBLISHER_REPOSITORY, useClass: SimpleEventPublisher },
    {
      provide: MEMBERSHIP_REPOSITORY,
      useClass: InMemoryMembershipReadRepository,
    },
    { provide: MEMBERSHIP_EVENT_STORE, useClass: InMemoryMembershipEventStore },
  ],
  exports: [CreateMembershipCommandHandler],
})
export class MembershipModule {}
