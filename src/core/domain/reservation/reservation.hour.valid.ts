import { BadRequestException } from '@nestjs/common';
import { ReservationRepository } from './reservation.repository';

export class ReservationHourValid {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async valid(hour: number): Promise<void> {
    if (isNaN(hour) || hour <= 0) {
      throw new BadRequestException(
        'Hour value must to be a valid positive number.',
      );
    }

    if (hour < 0 || hour > 23) {
      throw new BadRequestException('Hour must be between 0 and 23.');
    }

    await this.reservationRepository.validHour(hour);
  }
}
