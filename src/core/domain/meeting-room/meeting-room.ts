import { MeetingRoomCapacity } from './meeting-room.capacity';
import { MeetingRoomId } from './meeting-room.id';
import { MeetingRoomName } from './meeting-room.name';
import { MeetingRoomStatus } from './meeting-room.status';

export class MeetingRoom {
  id: MeetingRoomId;
  name: MeetingRoomName;
  capacity: MeetingRoomCapacity;
  status: MeetingRoomStatus;
  createdAt: Date;
  updatedAt: Date;

  constructor(name: MeetingRoomName, capacity: MeetingRoomCapacity) {
    this.id = MeetingRoomId.create();
    this.name = name;
    this.capacity = capacity;
    this.status = MeetingRoomStatus.getActive();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  getHotDesk(): this {
    return this;
  }
}
