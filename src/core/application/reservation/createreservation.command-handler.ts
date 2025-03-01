import { Reservation } from 'src/core/domain/reservation/reservation';
import {
  RESERVATION_REPOSITORY,
  ReservationRepository,
} from 'src/core/domain/reservation/reservation.repository';
import { ReservationDTO } from './dto/reservation.dto';
import { Inject } from '@nestjs/common';
import {
  MEETING_ROOM_REPOSITORY,
  MeetingRoomRepository,
} from 'src/core/domain/meeting-room/meeting-room.repository';
import { ReservationError } from './reservation.exception';
import { ReservationMeetingRoomId } from 'src/core/domain/reservation/reservation.meeting-room-id';
import { ReservationUserId } from 'src/core/domain/reservation/reservation.userid';
import { ReservationDate } from 'src/core/domain/reservation/reservation.date';
import { ReservationHour } from 'src/core/domain/reservation/reservation.hour';
import { ReservationDuration } from 'src/core/domain/reservation/reservation.duration';
import { isOverlapping } from 'src/core/domain/reservation/is-overlapping.reservation';

export class CreateReservationCommandHandler {
  constructor(
    @Inject(RESERVATION_REPOSITORY)
    private readonly reservationRepository: ReservationRepository,
    @Inject(MEETING_ROOM_REPOSITORY)
    private readonly meetingRoomRepository: MeetingRoomRepository,
  ) {}

  async reserveMeetingRoom(
    createReservation: ReservationDTO,
  ): Promise<Reservation> {
    const meetingRoomId = ReservationMeetingRoomId.create(
      createReservation.meetingRoomId,
    );
    const userId = ReservationUserId.create(createReservation.userId);
    const date = ReservationDate.create(createReservation.date);
    const hour = ReservationHour.create(createReservation.hour);
    const duration = ReservationDuration.create(createReservation.duration);

    const meetingRoom = await this.meetingRoomRepository.findById(
      createReservation.meetingRoomId,
    );

    if (!meetingRoom) {
      throw ReservationError.withMeetingRoomByIdNotFound(meetingRoomId);
    }

    const activeReservations =
      await this.reservationRepository.findActiveByMeetingRoomAndDate(
        createReservation.meetingRoomId,
        createReservation.date,
      );

    const newHour = createReservation.hour;
    const newDuration = createReservation.duration;

    for (const existingReservation of activeReservations) {
      const existingHour = existingReservation.hour.value();
      const existingDuration = existingReservation.duration.value();

      if (isOverlapping(newHour, newDuration, existingHour, existingDuration)) {
        throw ReservationError.withMeetingRoomIsOverlapping();
      }
    }

    const reserve = new Reservation(
      meetingRoomId,
      userId,
      date,
      hour,
      duration,
    );

    return this.reservationRepository.save(reserve);
  }
}
