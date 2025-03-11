import { Module } from '@nestjs/common';
import { InMemoryMembershipReadRepository } from './in-memory-membership-readmodel.repository';
import { InMemoryMembershipEventStore } from './in-memory-membership-event-store.repository';
import { SimpleEventPublisher } from './simple-event-publisher';
import { MembershipController } from 'src/event-sourcing/ui/membership.controller';
import { CreateMembershipCommandHandler } from 'src/event-sourcing/application/membership/create-membership.command-handler';
import { EVENT_PUBLISHER_REPOSITORY } from 'src/event-sourcing/domain/event-publisher';
import { MEMBERSHIP_REPOSITORY } from 'src/event-sourcing/domain/membership/membership.repository';
import { MEMBERSHIP_EVENT_STORE } from 'src/event-sourcing/domain/membership/membership.eventstore';
import { RegisterPackageCommandHandler } from 'src/event-sourcing/application/package/register-package.command-handler';

@Module({
  controllers: [MembershipController],
  providers: [
    CreateMembershipCommandHandler,
    RegisterPackageCommandHandler,
    { provide: EVENT_PUBLISHER_REPOSITORY, useClass: SimpleEventPublisher },
    {
      provide: MEMBERSHIP_REPOSITORY,
      useClass: InMemoryMembershipReadRepository,
    },
    { provide: MEMBERSHIP_EVENT_STORE, useClass: InMemoryMembershipEventStore },
  ],
  exports: [CreateMembershipCommandHandler, RegisterPackageCommandHandler],
})
export class MembershipModule {}
