import { Module } from '@nestjs/common';
import { CreateOfficeCommandHandler } from 'src/core/application/office/createoffice.command-handler';
import { OFFICE_REPOSITORY } from 'src/core/domain/office/office.repository';
import { OfficeController } from 'src/core/presentation/office/office.controller';
import { InMemoryOfficeRepository } from './office.inmemory.repository';

@Module({
  controllers: [OfficeController],
  providers: [
    CreateOfficeCommandHandler,
    {
      provide: OFFICE_REPOSITORY,
      useClass: InMemoryOfficeRepository,
    },
  ],
  exports: [OFFICE_REPOSITORY],
})
export class OfficeModule {}
