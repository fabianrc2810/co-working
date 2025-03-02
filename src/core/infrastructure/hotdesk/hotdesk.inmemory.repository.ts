import { Injectable } from '@nestjs/common';
import { HotDesk } from 'src/core/domain/hotdesk/hotdesk';
import { HotDeskNumber } from 'src/core/domain/hotdesk/hotdesk.number';
import { HotDeskRepository } from 'src/core/domain/hotdesk/hotdesk.repository';
import { HotDeskStatus } from 'src/core/domain/hotdesk/hotdesk.status';

@Injectable()
export class InMemoryHotDeskRepository implements HotDeskRepository {
  private readonly hotDesks: HotDesk[] = [];

  async findAvailable(): Promise<HotDesk | null> {
    const availableHotDesk = this.hotDesks.find(
      (hotDesk) => hotDesk.status === HotDeskStatus.getActive(),
    );
    return Promise.resolve(availableHotDesk || null);
  }

  async markAsAssigned(hotDeskId: string): Promise<void> {
    const hotDesk = this.hotDesks.find((h) => h.id === hotDeskId);

    if (hotDesk) {
      hotDesk.status = HotDeskStatus.getAssigned();
    }

    return Promise.resolve();
  }

  exists(objHotDesk: HotDeskNumber): Promise<boolean> {
    const value = objHotDesk.value();
    return Promise.resolve(
      this.hotDesks.some((h) => h.number.value() === value),
    );
  }

  async save(hotDesk: HotDesk): Promise<void> {
    this.hotDesks.push(hotDesk);
    await Promise.resolve();
  }
}
