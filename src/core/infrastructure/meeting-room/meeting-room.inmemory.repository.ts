import { MeetingRoom } from 'src/core/domain/meeting-room/meeting-room';
import { MeetingRoomName } from 'src/core/domain/meeting-room/meeting-room.name';
import { MeetingRoomRepository } from 'src/core/domain/meeting-room/meeting-room.repository';

export class InMemoryMeetingRoomRepository implements MeetingRoomRepository {
  private readonly meetingRooms: MeetingRoom[] = [];

  checkName(name: string): Promise<boolean> {
    return Promise.resolve(!!name);
  }

  checkCapacity(capacity: number): Promise<boolean> {
    return Promise.resolve(!!capacity);
  }

  exists(name: MeetingRoomName): Promise<boolean> {
    const value = name.value();
    return Promise.resolve(
      this.meetingRooms.some((mr) => mr.name.value() === value),
    );
  }

  save(meetingRoom: MeetingRoom): Promise<MeetingRoom> {
    this.meetingRooms.push(meetingRoom);
    return Promise.resolve(meetingRoom);
  }
}
