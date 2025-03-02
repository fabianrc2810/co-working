/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Body, Controller, Post } from '@nestjs/common';
import { ReservationDTO } from 'src/core/application/reservation/dto/reservation.dto';
import { CreateReservationCommandHandler } from 'src/core/application/reservation/createreservation.command-handler';
import { ErrorResponseFactory } from '../error-response-factory';

@Controller('reservation')
export class ReservationController {
  constructor(
    private readonly registerReservation: CreateReservationCommandHandler,
  ) {}

  @Post()
  async reserve(@Body() reservation: ReservationDTO): Promise<ReservationDTO> {
    try {
      await this.registerReservation.handle(reservation);
      return reservation;
    } catch (error) {
      throw ErrorResponseFactory.create(error);
    }
  }
}
