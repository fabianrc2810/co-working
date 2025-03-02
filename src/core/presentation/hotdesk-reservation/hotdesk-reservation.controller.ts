/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { HotDeskReservationDto } from 'src/core/application/hotdesk-reservation/dto/hotdesk-reservation';
import { ErrorResponseFactory } from '../error-response-factory';
import { CreateHotDeskReservationCommandHandler } from 'src/core/application/hotdesk-reservation/createhotdesk-reservation.command-handler';

@Controller('hotdesk-reservations')
export class HotDeskReservationController {
  constructor(
    private readonly reserveHotDeskUseCase: CreateHotDeskReservationCommandHandler,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async reserve(
    @Body() request: HotDeskReservationDto,
  ): Promise<HotDeskReservationDto> {
    try {
      await this.reserveHotDeskUseCase.handle(request);
      return request;
    } catch (error) {
      throw ErrorResponseFactory.create(error);
    }
  }
}
