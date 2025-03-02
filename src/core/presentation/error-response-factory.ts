import { HttpException, HttpStatus } from '@nestjs/common';
import { InvalidOfficeLeasePeriodError } from 'src/core/domain/office/invalid-office-leaseperiod.error';
import { InvalidOfficeNumberError } from '../domain/office/invalid-office-number.error';
import { OfficeNumberDuplicatedException } from '../application/office/office.exception';
import { InvalidOfficeStatusError } from '../domain/office/invalid-office-status.error';
import { InvalidHotDeskNumberError } from '../domain/hotdesk/invalid-hotdesknumber.error';
import { HotDeskNumberDuplicatedException } from '../application/hotdesk/hotdesk.exception';
import { InvalidMeetingRoomCapacityError } from '../domain/meeting-room/invalid-meeting-room-capacity.error';
import { InvalidMeetingRoomNameError } from '../domain/meeting-room/invalid-meeting-room-name.error';
import { MeetingRoomDuplicatedException } from '../application/meeting-room/meeting-room.exception';
import { InvalidReservationDateError } from '../domain/reservation/invalid-reservation-date.error';
import { InvalidReservationDurationError } from '../domain/reservation/invalid-reservation-duration.error';
import { InvalidReservationHourError } from '../domain/reservation/invalid-reservation-hour.error';
import { InvalidReservationMeetingRoomIdError } from '../domain/reservation/invalid-reservation-meeting-room-id.error copy';
import { InvalidReservationUserError } from '../domain/reservation/invalid-reservation-user.error';
import { ReservationError } from '../application/reservation/reservation.exception';
import { ReservationMeetingRoomError } from '../application/reservation/reservation-meeting-room.exception';

type ErrorClass = new (...args: any[]) => Error;

type ErrorMapping = {
  status: HttpStatus;
  code: string;
};

const errorMappings = new Map<ErrorClass, ErrorMapping>([
  [
    InvalidHotDeskNumberError,
    { status: HttpStatus.BAD_REQUEST, code: 'INVALID_HOT_DESK_NUMBER' },
  ],
  [
    HotDeskNumberDuplicatedException,
    { status: HttpStatus.CONFLICT, code: 'DUPLICATED_HOT_DESK' },
  ],
  [
    InvalidMeetingRoomCapacityError,
    { status: HttpStatus.BAD_REQUEST, code: 'INVALID_MEETING_ROOM_CAPACITY' },
  ],
  [
    InvalidMeetingRoomNameError,
    { status: HttpStatus.BAD_REQUEST, code: 'INVALID_MEETING_ROOM_NAME' },
  ],
  [
    MeetingRoomDuplicatedException,
    { status: HttpStatus.CONFLICT, code: 'DUPLICATED_MEETING_ROOM' },
  ],
  [
    InvalidOfficeLeasePeriodError,
    { status: HttpStatus.BAD_REQUEST, code: 'INVALID_OFFICE_LEASE_PERIOD' },
  ],
  [
    InvalidOfficeNumberError,
    { status: HttpStatus.BAD_REQUEST, code: 'INVALID_OFFICE_NUMBER' },
  ],
  [
    InvalidOfficeStatusError,
    { status: HttpStatus.BAD_REQUEST, code: 'INVALID_OFFICE_STATUS' },
  ],
  [
    OfficeNumberDuplicatedException,
    { status: HttpStatus.CONFLICT, code: 'DUPLICATED_OFFICE' },
  ],
  [
    InvalidReservationDateError,
    { status: HttpStatus.BAD_REQUEST, code: 'INVALID_RESERVATION_DATE' },
  ],
  [
    InvalidReservationDurationError,
    { status: HttpStatus.BAD_REQUEST, code: 'INVALID_RESERVATION_DURATION' },
  ],
  [
    InvalidReservationHourError,
    { status: HttpStatus.BAD_REQUEST, code: 'INVALID_RESERVATION_HOUR' },
  ],
  [
    InvalidReservationMeetingRoomIdError,
    {
      status: HttpStatus.BAD_REQUEST,
      code: 'INVALID_RESERVATION_MEETING_ROOM_ID',
    },
  ],
  [
    InvalidReservationUserError,
    {
      status: HttpStatus.BAD_REQUEST,
      code: 'INVALID_RESERVATION_USER_ID',
    },
  ],
  [
    ReservationError,
    {
      status: HttpStatus.CONFLICT,
      code: 'RESERVATION_ERROR',
    },
  ],
  [
    ReservationMeetingRoomError,
    {
      status: HttpStatus.NOT_FOUND,
      code: 'RESERVATION_MEETING_ROOM_ERROR',
    },
  ],
]);

export class ErrorResponseFactory {
  static create(error: Error): HttpException {
    const errorConstructor = error.constructor as ErrorClass;
    const mapping = errorMappings.get(errorConstructor);
    if (mapping) {
      return new HttpException(
        { message: error.message, code: mapping.code },
        mapping.status,
      );
    }
    return new HttpException(
      { message: 'Internal server error', code: 'INTERNAL_SERVER_ERROR' },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
