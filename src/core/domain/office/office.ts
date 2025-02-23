import { OfficeId } from './office.id';
import { OfficeLeasePeriod } from './office.leaseperiod';
import { OfficeNumber } from './office.number';
import { OfficeStatus } from './office.status';

export class Office {
  id: OfficeId;
  number: OfficeNumber;
  leasePeriod: OfficeLeasePeriod | number;
  status: OfficeStatus | string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    number: OfficeNumber,
    leasePeriod: OfficeLeasePeriod,
    status: OfficeStatus,
  ) {
    this.id = OfficeId.create();
    this.number = number;
    this.leasePeriod = leasePeriod;
    this.status = status;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  getOffice(): this {
    return this;
  }
}
