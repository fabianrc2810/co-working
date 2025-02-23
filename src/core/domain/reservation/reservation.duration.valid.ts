import { BadRequestException } from '@nestjs/common';
import { ReservationRepository } from './reservation.repository';

export class ReservationDurationValid {
  constructor(private readonly reservationRepository: ReservationRepository) {}
  async valid(duration: number): Promise<void> {
    if (isNaN(duration) || duration <= 0) {
      throw new BadRequestException(
        'Duration must be a valid positive number.',
      );
    }

    if (duration < 1 || duration > 12) {
      throw new BadRequestException('Duration must be between 1 and 12.');
    }

    await this.reservationRepository.validDuration(duration);
  }
}
