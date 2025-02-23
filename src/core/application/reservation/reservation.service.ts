import { Reservation } from 'src/core/domain/reservation/reservation';
import {
  RESERVATION_REPOSITORY,
  ReservationRepository,
} from 'src/core/domain/reservation/reservation.repository';
import { ReservationDTO } from './dto/reservation.dto';
import { Inject } from '@nestjs/common';
import { ReservationDateValid } from 'src/core/domain/reservation/reservation.date.valid';
import { ReservationHourValid } from 'src/core/domain/reservation/reservation.hour.valid';
import { ReservationDurationValid } from 'src/core/domain/reservation/reservation.duration.valid';
import { ReservationUserValid } from 'src/core/domain/reservation/reservation.user.valid';

export class ReservationService {
  constructor(
    @Inject(RESERVATION_REPOSITORY)
    private readonly reservationRepository: ReservationRepository,
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
