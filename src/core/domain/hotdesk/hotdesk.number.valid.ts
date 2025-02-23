import { BadRequestException } from '@nestjs/common';
import { HotDeskRepository } from './hotdesk.repository';

export class HotDeskNumberValid {
  constructor(private readonly hotDeskRepository: HotDeskRepository) {}

  async valid(number: number): Promise<void> {
    if (isNaN(number) || number <= 0) {
      throw new BadRequestException(
        'HotDesk number must be a valid positive integer.',
      );
    }

    await this.hotDeskRepository.valid(number);
  }
}
