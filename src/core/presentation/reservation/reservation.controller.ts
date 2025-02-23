import { Body, Controller, Post } from '@nestjs/common';
import { ReservationDTO } from 'src/core/application/reservation/dto/reservation.dto';
import { ReservationService } from 'src/core/application/reservation/reservation.service';
import { Reservation } from 'src/core/domain/reservation/reservation';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly registerReservation: ReservationService) {}

  @Post()
  async reserve(@Body() reservation: ReservationDTO): Promise<Reservation> {
    return this.registerReservation.reserveMeetingRoom(reservation);
  }
}
