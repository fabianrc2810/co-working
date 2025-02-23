import { Reservation } from 'src/core/domain/reservation/reservation';
import {
  RESERVATION_REPOSITORY,
  ReservationRepository,
} from 'src/core/domain/reservation/reservation.repository';
import { ReservationDTO } from './dto/reservation.dto';
import { Inject } from '@nestjs/common';

export class ReservationService {
  constructor(
    @Inject(RESERVATION_REPOSITORY)
    private readonly reservationRepository: ReservationRepository,
  ) {}

  async reserveMeetingRoom(reservation: ReservationDTO): Promise<Reservation> {
    const reserve = new Reservation(
      reservation.meetingRoomId,
      reservation.userId,
      reservation.date,
      reservation.hour,
      reservation.duration,
    );

    console.log(this.reservationRepository);

    return this.reservationRepository.save(reserve);
  }
}
