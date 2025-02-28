import { Inject } from '@nestjs/common';
import {
  OFFICE_REPOSITORY,
  OfficeRepository,
} from 'src/core/domain/office/office.repository';
import { CreateOfficeDTO } from './dto/office.dto';
import { Office } from 'src/core/domain/office/office';
import { OfficeNumber } from 'src/core/domain/office/office.number';
import { OfficeLeasePeriod } from 'src/core/domain/office/office.leaseperiod';
import { OfficeStatus } from 'src/core/domain/office/office.status';
import { OfficeNumberDuplicatedException } from './office.exception';

export class CreateOfficeCommandHandler {
  constructor(
    @Inject(OFFICE_REPOSITORY)
    private readonly officeRepository: OfficeRepository,
  ) {}

  async handle(createOfficeCommand: CreateOfficeDTO): Promise<void> {
    const officeLeasePeriod = createOfficeCommand.leasePeriod
      ? OfficeLeasePeriod.create(createOfficeCommand.leasePeriod)
      : OfficeLeasePeriod.default();

    const officeStatus = createOfficeCommand.status
      ? OfficeStatus.create(createOfficeCommand.status)
      : OfficeStatus.default();

    const officeNumber = OfficeNumber.create(createOfficeCommand.number);

    const exists = await this.officeRepository.exists(officeNumber);
    if (exists) {
      throw OfficeNumberDuplicatedException.withOfficeNumber(officeNumber);
    }
    const office = new Office(officeNumber, officeLeasePeriod, officeStatus);

    await this.officeRepository.save(office);
  }
}
