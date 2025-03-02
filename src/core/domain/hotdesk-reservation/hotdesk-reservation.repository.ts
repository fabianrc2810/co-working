import { HotDeskReservation } from './hotdesk-reservation';

export const HOTDESK_RESERVATION_REPOSITORY = 'HOTDESK_RESERVATION_REPOSITORY';

export interface HotDeskReservationRepository {
  findByUserIdAndDate(
    userId: string,
    date: string,
  ): Promise<HotDeskReservation | null>;
  save(reservation: HotDeskReservation): Promise<HotDeskReservation>;
}
