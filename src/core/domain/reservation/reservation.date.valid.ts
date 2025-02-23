import { BadRequestException } from '@nestjs/common';
import { ReservationRepository } from './reservation.repository';

export class ReservationDateValid {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async valid(date: string): Promise<void> {
    if (!date) {
      throw new BadRequestException('Date is required.');
    }

    if (isNaN(Date.parse(date))) {
      throw new BadRequestException('Date must be a valid date.');
    }

    if (new Date(date) < new Date()) {
      throw new BadRequestException('Date must be a future date.');
    }

    if (!(await this.reservationRepository.validDate(date))) {
      throw new BadRequestException('Date is already reserved.');
    }
  }
}
