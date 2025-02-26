import { MeetingRoom } from './meeting-room';
import { MeetingRoomName } from './meeting-room.name';
export const MEETING_ROOM_REPOSITORY = 'MEETING_ROOM_REPOSITORY';

export interface MeetingRoomRepository {
  exists(name: MeetingRoomName): Promise<boolean>;
  checkName(name: string): Promise<boolean>;
  checkCapacity(capacity: number): Promise<boolean>;
  save(name: MeetingRoom): Promise<MeetingRoom>;
  findById(id: string): Promise<MeetingRoom | null>;
}
