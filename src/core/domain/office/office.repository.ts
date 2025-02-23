import { Office } from './office';
import { OfficeNumber } from './office.number';
export const OFFICE_REPOSITORY = 'OFFICE_REPOSITORY';

export interface OfficeRepository {
  validNumber(number: number): Promise<boolean>;
  validLeasePeriod(leasePeriod: number): Promise<boolean>;
  validStatus(status: string): Promise<boolean>;
  exists(number: OfficeNumber): Promise<boolean>;
  save(office: Office): Promise<Office>;
}
