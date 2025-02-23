import { Injectable } from '@nestjs/common';
import { HotDesk } from 'src/core/domain/hotdesk/hotdesk';
import { HotDeskNumber } from 'src/core/domain/hotdesk/hotdesk.number';
import { HotDeskRepository } from 'src/core/domain/hotdesk/hotdesk.repository';

@Injectable()
export class InMemoryHotDeskRepository implements HotDeskRepository {
  private readonly hotDesks: HotDesk[] = [];

  valid(number: number): Promise<boolean> {
    const value = number;
    return Promise.resolve(!!value);
  }

  exists(objHotDesk: HotDeskNumber): Promise<boolean> {
    const value = objHotDesk.value();
    return Promise.resolve(
      this.hotDesks.some((h) => h.number.value() === value),
    );
  }

  save(hotDesk: HotDesk): Promise<HotDesk> {
    this.hotDesks.push(hotDesk);
    return Promise.resolve(hotDesk);
  }
}
