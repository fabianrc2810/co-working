import { Office } from 'src/core/domain/office/office';
import { OfficeNumber } from 'src/core/domain/office/office.number';
import { OfficeRepository } from 'src/core/domain/office/office.repository';

export class InMemoryOfficeRepository implements OfficeRepository {
  private readonly offices: Office[] = [];

  validNumber(number: number): Promise<boolean> {
    return Promise.resolve(!!number);
  }

  validLeasePeriod(leasePeriod: number): Promise<boolean> {
    return Promise.resolve(!!leasePeriod);
  }

  validStatus(status: string): Promise<boolean> {
    return Promise.resolve(!!status);
  }

  exists(name: OfficeNumber): Promise<boolean> {
    const value = name.value();
    return Promise.resolve(
      this.offices.some((o) => o.number.value() === value),
    );
  }

  save(office: Office): Promise<Office> {
    this.offices.push(office);
    return Promise.resolve(office);
  }
}
