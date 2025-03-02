import { Status } from '../status';

export class HotDeskStatus extends Status {
  static getActive(): string {
    return 'Active';
  }

  static getAssigned(): string {
    return 'Assigned';
  }
}
