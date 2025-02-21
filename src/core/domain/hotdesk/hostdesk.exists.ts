import { ConflictException } from '@nestjs/common';
import { HotDeskNumber } from './hotdesk.number';
import { HotDeskRepository } from './hotdesk.repository';

export class HotDeskExists {
  constructor(private readonly hotDeskRepository: HotDeskRepository) {}

  async check(number: HotDeskNumber): Promise<void> {
    const exists = await this.hotDeskRepository.exists(number);
    if (exists) {
      throw new ConflictException('HotDesk number already exists.');
    }
  }
}
