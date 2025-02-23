import { Inject } from '@nestjs/common';
import {
  OFFICE_REPOSITORY,
  OfficeRepository,
} from 'src/core/domain/office/office.repository';
import { CreateOfficeDTO } from './dto/office.dto';
import { Office } from 'src/core/domain/office/office';
import { OfficeNumberValid } from 'src/core/domain/office/office.number.valid';
import { OfficeLeasePeriodValid } from 'src/core/domain/office/office.leaseperiod.valid';
import { OfficeStatusValid } from 'src/core/domain/office/office.status.valid';
import { OfficeNumberExists } from 'src/core/domain/office/office.number.exists';
import { OfficeNumber } from 'src/core/domain/office/office.number';
import { OfficeLeasePeriod } from 'src/core/domain/office/office.leaseperiod';
import { OfficeStatus } from 'src/core/domain/office/office.status';

export class OfficeService {
  constructor(
    @Inject(OFFICE_REPOSITORY)
    private readonly officeRepository: OfficeRepository,
  ) {}

  async execute(createOffice: CreateOfficeDTO): Promise<Office> {
    const officeNumberValid = new OfficeNumberValid(this.officeRepository);

    await officeNumberValid.valid(createOffice.number);

    if (createOffice.leasePeriod) {
      const officeLeasePeriod = new OfficeLeasePeriodValid(
        this.officeRepository,
      );
      await officeLeasePeriod.valid(createOffice.leasePeriod);
    }

    const officeLeasePeriod = createOffice.leasePeriod
      ? OfficeLeasePeriod.create(createOffice.leasePeriod)
      : OfficeLeasePeriod.create(12);

    if (createOffice.status) {
      const officeStatus = new OfficeStatusValid(this.officeRepository);
      await officeStatus.valid(createOffice.status);
    }
    const officeStatus = createOffice.status
      ? OfficeStatus.create(createOffice.status)
      : OfficeStatus.create(OfficeStatus.getActive());

    const officeNumber = OfficeNumber.create(createOffice.number);

    const officeNumberExists = new OfficeNumberExists(this.officeRepository);
    await officeNumberExists.check(officeNumber);

    const office = new Office(officeNumber, officeLeasePeriod, officeStatus);

    return this.officeRepository.save(office);
  }
}
