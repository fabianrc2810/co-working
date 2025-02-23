import { Status } from '../status';

export class ReservationStatus extends Status {
  static getActive(): string {
    return 'Active';
  }
}
