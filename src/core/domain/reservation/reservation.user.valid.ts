import { BadRequestException } from '@nestjs/common';
import { ReservationRepository } from './reservation.repository';

export class ReservationUserValid {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async valid(userId: string): Promise<boolean> {
    if (!userId) {
      throw new BadRequestException('User is required.');
    }

    return this.reservationRepository.validUser(userId);
  }
}
