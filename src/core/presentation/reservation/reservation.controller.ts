import { Body, Controller, Post } from '@nestjs/common';
import { ReservationDTO } from 'src/core/application/reservation/dto/reservation.dto';
import { CreateReservationCommandHandler } from 'src/core/application/reservation/createreservation.command-handler';
import { Reservation } from 'src/core/domain/reservation/reservation';

@Controller('reservation')
export class ReservationController {
  constructor(
    private readonly registerReservation: CreateReservationCommandHandler,
  ) {}

  @Post()
  async reserve(@Body() reservation: ReservationDTO): Promise<Reservation> {
    return this.registerReservation.reserveMeetingRoom(reservation);
  }
}
