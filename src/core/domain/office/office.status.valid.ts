import { BadRequestException } from '@nestjs/common';
import { OfficeRepository } from './office.repository';

export class OfficeStatusValid {
  constructor(private readonly OfficeRepository: OfficeRepository) {}

  async valid(status: string): Promise<void> {
    const statusList = ['Activo', 'Inactivo'];
    if (!statusList.includes(status)) {
      throw new BadRequestException(
        'Status value must be a valid positive integer.',
      );
    }

    await this.OfficeRepository.validStatus(status);
  }
}
