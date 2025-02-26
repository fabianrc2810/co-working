import { Reservation } from 'src/core/domain/reservation/reservation';
import {
  RESERVATION_REPOSITORY,
  ReservationRepository,
} from 'src/core/domain/reservation/reservation.repository';
import { ReservationDTO } from './dto/reservation.dto';
import { ConflictException, Inject } from '@nestjs/common';
import { ReservationDateValid } from 'src/core/domain/reservation/reservation.date.valid';
import { ReservationHourValid } from 'src/core/domain/reservation/reservation.hour.valid';
import { ReservationDurationValid } from 'src/core/domain/reservation/reservation.duration.valid';
import { ReservationUserValid } from 'src/core/domain/reservation/reservation.user.valid';
import {
  MEETING_ROOM_REPOSITORY,
  MeetingRoomRepository,
} from 'src/core/domain/meeting-room/meeting-room.repository';
import { ReservationMeetingRoomFind } from 'src/core/domain/reservation/reservation.meetingroom.find';

export class ReservationService {
  constructor(
    @Inject(RESERVATION_REPOSITORY)
    private readonly reservationRepository: ReservationRepository,
    @Inject(MEETING_ROOM_REPOSITORY)
    private readonly meetingRoomRepository: MeetingRoomRepository,
  ) {}

  async reserveMeetingRoom(reservation: ReservationDTO): Promise<Reservation> {
    const dateValid = new ReservationDateValid(this.reservationRepository);
    await dateValid.valid(reservation.date);

    const hourValid = new ReservationHourValid(this.reservationRepository);
    await hourValid.valid(reservation.hour);

    const durationValid = new ReservationDurationValid(
      this.reservationRepository,
    );
    await durationValid.valid(reservation.duration);

    const userValid = new ReservationUserValid(this.reservationRepository);
    await userValid.valid(reservation.userId);

    const meetingRoom = await this.meetingRoomRepository.findById(
      reservation.meetingRoomId,
    );
    ReservationMeetingRoomFind.findMeetingRoomById(
      meetingRoom,
      reservation.meetingRoomId,
    );

    const activeReservations =
      await this.reservationRepository.findActiveByMeetingRoomAndDate(
        reservation.meetingRoomId,
        reservation.date,
      );

    const isOverlapping = activeReservations.some((reservation) => {
      const existingStart = reservation.hour.value();
      const existingEnd =
        reservation.hour.value() + reservation.duration.value();
      const requestedStart = reservation.hour.value();
      const requestedEnd =
        reservation.hour.value() + reservation.duration.value();

      return requestedStart < existingEnd && existingStart < requestedEnd;
    });

    if (isOverlapping) {
      throw new ConflictException(
        'Ya existe una reserva activa que se solapa con la franja horaria solicitada',
      );
    }

    const reserve = new Reservation(
      reservation.meetingRoomId,
      reservation.userId,
      reservation.date,
      reservation.hour,
      reservation.duration,
    );

    return this.reservationRepository.save(reserve);
  }
}
