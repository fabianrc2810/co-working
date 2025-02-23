import { BadRequestException } from '@nestjs/common';
import { OfficeRepository } from './office.repository';

export class OfficeNumberValid {
  constructor(private readonly OfficeRepository: OfficeRepository) {}

  async valid(number: number): Promise<void> {
    if (isNaN(number) || number <= 0) {
      throw new BadRequestException(
        'Office number must be a valid positive integer.',
      );
    }

    await this.OfficeRepository.validNumber(number);
  }
}
