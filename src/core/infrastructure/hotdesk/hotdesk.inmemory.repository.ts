import { Injectable } from '@nestjs/common';
import { HotDesk } from 'src/core/domain/hotdesk/hotdesk';
import { HotDeskNumber } from 'src/core/domain/hotdesk/hotdesk.number';
import { HotDeskRepository } from 'src/core/domain/hotdesk/hotdesk.repository';

@Injectable()
export class InMemoryHotDeskRepository implements HotDeskRepository {
  private readonly hotDesks: HotDesk[] = [];

  exists(objHotDesk: HotDeskNumber): Promise<boolean> {
    const value = objHotDesk.value();
    return Promise.resolve(
      this.hotDesks.some((h) => h.number.value() === value),
    );
  }

  async save(hotDesk: HotDesk): Promise<void> {
    this.hotDesks.push(hotDesk);
    await Promise.resolve(hotDesk);
  }
}
