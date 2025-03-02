import { Status } from '../status';

export class HotDeskReservationStatus extends Status {
  static getActive(): string {
    return 'Active';
  }
}
