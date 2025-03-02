import { HotDeskReservation } from 'src/core/domain/hotdesk-reservation/hotdesk-reservation';
import { HotDeskReservationRepository } from 'src/core/domain/hotdesk-reservation/hotdesk-reservation.repository';

export class InMemoryHotDeskReservationRepository
  implements HotDeskReservationRepository
{
  private readonly reservations: HotDeskReservation[] = [];

  findByUserIdAndDate(
    userId: string,
    date: string,
  ): Promise<HotDeskReservation | null> {
    const result =
      this.reservations.find(
        (r) => r.userId.value() === userId && r.date.value() === date,
      ) || null;

    return Promise.resolve(result);
  }

  save(reservation: HotDeskReservation): Promise<HotDeskReservation> {
    this.reservations.push(reservation);
    return Promise.resolve(reservation);
  }
}
