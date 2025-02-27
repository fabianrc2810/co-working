import { Module } from '@nestjs/common';
import { CreateHotDeskCommandHandler } from '../../application/hotdesk/createhotdesk.command-handler';
import { InMemoryHotDeskRepository } from './hotdesk.inmemory.repository';
import { HotDeskController } from '../../presentation/hotdesk/hotdesk.controller';
import { HOTDESK_REPOSITORY } from '../../domain/hotdesk/hotdesk.repository';

@Module({
  controllers: [HotDeskController],
  providers: [
    CreateHotDeskCommandHandler,
    {
      provide: HOTDESK_REPOSITORY,
      useClass: InMemoryHotDeskRepository,
    },
  ],
  exports: [HOTDESK_REPOSITORY],
})
export class HotDeskModule {}
