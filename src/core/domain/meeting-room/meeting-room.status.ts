import { Status } from '../status';

export class MeetingRoomStatus extends Status {
  static getActive(): string {
    return 'Active';
  }
}
