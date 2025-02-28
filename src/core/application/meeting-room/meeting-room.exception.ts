import { MeetingRoomName } from 'src/core/domain/meeting-room/meeting-room.name';
import { BaseError } from 'src/core/exceptions/base-error.exception';

export class MeetingRoomDuplicatedException extends BaseError {
  constructor(message: string) {
    super(message, 'MeetingRoomDuplicatedException');
  }

  static withHotDeskNumber(
    meetingRoomName: MeetingRoomName,
  ): MeetingRoomDuplicatedException {
    return new MeetingRoomDuplicatedException(
      `Meeting room name '${meetingRoomName.value()}' already exists.`,
    );
  }
}
