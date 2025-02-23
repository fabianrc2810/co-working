import { BadRequestException } from '@nestjs/common';
import { OfficeRepository } from './office.repository';

export class OfficeLeasePeriodValid {
  constructor(private readonly OfficeRepository: OfficeRepository) {}

  async valid(number: number): Promise<void> {
    if (isNaN(number) || number <= 0) {
      throw new BadRequestException(
        'Lease period number must be a valid positive integer.',
      );
    }

    await this.OfficeRepository.validLeasePeriod(number);
  }
}
