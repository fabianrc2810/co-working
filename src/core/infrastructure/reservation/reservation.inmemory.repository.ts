import { Reservation } from 'src/core/domain/reservation/reservation';
import { ReservationRepository } from 'src/core/domain/reservation/reservation.repository';

export class InMemoryReservation implements ReservationRepository {
  private readonly reservations: Reservation[] = [];

  async save(reservation: Reservation): Promise<Reservation> {
    this.reservations.push(reservation);
    return Promise.resolve(reservation);
  }
}
