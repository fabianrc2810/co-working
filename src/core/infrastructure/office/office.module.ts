import { Module } from '@nestjs/common';
import { OfficeService } from 'src/core/application/office/office.service';
import { OFFICE_REPOSITORY } from 'src/core/domain/office/office.repository';
import { OfficeController } from 'src/core/presentation/office/office.controller';
import { InMemoryOfficeRepository } from './office.inmemory.repository';

@Module({
  controllers: [OfficeController],
  providers: [
    OfficeService,
    {
      provide: OFFICE_REPOSITORY,
      useClass: InMemoryOfficeRepository,
    },
  ],
  exports: [OFFICE_REPOSITORY],
})
export class OfficeModule {}
