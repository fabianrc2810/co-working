import { HotDeskNumber } from './hotdesk.number';
import { HotDeskRepository } from './hotdesk.repository';
import { HttpConflictException } from '../http/conflict.exception';

export class HotDeskExists {
  constructor(private readonly hotDeskRepository: HotDeskRepository) {}

  async check(number: HotDeskNumber): Promise<void> {
    const exists = await this.hotDeskRepository.exists(number);
    if (exists) {
      throw new HttpConflictException('HotDesk number already exists.');
    }
  }
}
