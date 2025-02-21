import { HotDeskId } from 'src/core/domain/hotdesk/hotdesk.id';
import { HotDeskStatus } from 'src/core/domain/status';
import { HotDeskNumber } from './hotdesk.number';

export class HotDesk {
  id: HotDeskId;
  number: HotDeskNumber;
  status: HotDeskStatus;
  createdAt: Date;
  updatedAt: Date;

  constructor(number: HotDeskNumber) {
    this.id = HotDeskId.create();
    this.number = number;
    this.status = HotDeskStatus.getActive();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  getHotDesk(): this {
    return this;
  }
}
