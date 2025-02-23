import { Reservation } from './reservation';
export const RESERVATION_REPOSITORY = 'RESERVATION_REPOSITORY';

export interface ReservationRepository {
  save(reservation: Reservation): Promise<Reservation>;
}
