import { Reservation } from 'src/core/domain/reservation/reservation';
import { ReservationRepository } from 'src/core/domain/reservation/reservation.repository';

export class InMemoryReservation implements ReservationRepository {
  private readonly reservations: Reservation[] = [];

  async validDate(date: string): Promise<boolean> {
    return Promise.resolve(!!date);
  }

  async validHour(hour: number): Promise<boolean> {
    return Promise.resolve(!!hour);
  }

  async validDuration(duration: number): Promise<boolean> {
    return Promise.resolve(!!duration);
  }

  async validUser(userId: string): Promise<boolean> {
    return Promise.resolve(!!userId);
  }

  async save(reservation: Reservation): Promise<Reservation> {
    this.reservations.push(reservation);
    return Promise.resolve(reservation);
  }
}
