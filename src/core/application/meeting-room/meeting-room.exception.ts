import { MeetingRoomName } from 'src/core/domain/meeting-room/meeting-room.name';

export class MeetingRoomDuplicatedException extends Error {
  static withHotDeskNumber(
    meetingRoomName: MeetingRoomName,
  ): MeetingRoomDuplicatedException {
    return new MeetingRoomDuplicatedException(
      `Meeting room name ${meetingRoomName.value()} already exists.`,
    );
  }
}
