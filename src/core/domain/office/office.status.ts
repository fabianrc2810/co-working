import { Status } from '../status';
import { InvalidOfficeStatusError } from './invalid-office-status.error';

export class OfficeStatus extends Status {
  private readonly status: string;

  constructor(status: string) {
    super();
    this.status = status;
  }

  static create(status: string): OfficeStatus {
    const statusList = ['Activo', 'Inactivo'];
    if (!statusList.includes(status)) {
      throw InvalidOfficeStatusError.withInvalidOfficeStatus(status);
    }

    return new OfficeStatus(status);
  }

  static default(): OfficeStatus {
    return new OfficeStatus(OfficeStatus.getActive());
  }

  static getInactive(): string {
    return 'Inactive';
  }

  static getActive(): string {
    return 'Active';
  }

  value(): string {
    return this.status;
  }
}
