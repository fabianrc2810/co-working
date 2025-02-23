import { Status } from '../status';

export class OfficeStatus extends Status {
  private readonly status: string;

  constructor(status: string) {
    super();
    this.status = status;
  }

  static create(status: string): OfficeStatus {
    return new OfficeStatus(status);
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
