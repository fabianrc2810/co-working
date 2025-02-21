import { HotDeskNumber } from './hotdesk.number';
import { HotDeskId } from './hotdesk.id';
import { HotDeskStatus } from './hotdesk.status';

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
