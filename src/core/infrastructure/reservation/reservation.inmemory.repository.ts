import { Reservation } from 'src/core/domain/reservation/reservation';
import { ReservationRepository } from 'src/core/domain/reservation/reservation.repository';

export class InMemoryReservation implements ReservationRepository {
  private readonly reservations: Reservation[] = [];
  get(): Promise<Reservation[]> {
    return Promise.resolve(this.reservations);
  }

  async isOverlapping(result: boolean): Promise<boolean> {
    return Promise.resolve(result);
  }

  async findActiveByMeetingRoomAndDate(
    meetingRoomId: string,
    date: string,
  ): Promise<Reservation[]> {
    return Promise.resolve(
      this.reservations.filter(
        (reservation) =>
          reservation.meetingRoomId.value() === meetingRoomId &&
          reservation.date.value() === date &&
          reservation.status,
      ),
    );
  }

  async save(reservation: Reservation): Promise<Reservation> {
    this.reservations.push(reservation);
    return Promise.resolve(reservation);
  }
}
