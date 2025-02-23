import { HttpConflictException } from '../http/conflict.exception';
import { OfficeNumber } from './office.number';
import { OfficeRepository } from './office.repository';

export class OfficeNumberExists {
  constructor(private readonly officeRepository: OfficeRepository) {}

  async check(number: OfficeNumber): Promise<void> {
    const exists = await this.officeRepository.exists(number);
    if (exists) {
      throw new HttpConflictException(
        'Office with that number already exists.',
      );
    }
  }
}
