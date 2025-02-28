import { BadRequestException } from '@nestjs/common';
import { Status } from '../status';

export class OfficeStatus extends Status {
  private readonly status: string;

  constructor(status: string) {
    super();
    this.status = status;
  }

  static create(status: string): OfficeStatus {
    const statusList = ['Activo', 'Inactivo'];
    if (!statusList.includes(status)) {
      throw new BadRequestException(
        'Status value must be a valid positive integer.',
      );
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
