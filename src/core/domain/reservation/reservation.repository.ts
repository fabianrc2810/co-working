import { Reservation } from './reservation';
export const RESERVATION_REPOSITORY = 'RESERVATION_REPOSITORY';

export interface ReservationRepository {
  get(): Promise<Reservation[]>;
  save(reservation: Reservation): Promise<Reservation>;
  findActiveByMeetingRoomAndDate(
    meetingRoomId: string,
    date: string,
  ): Promise<Reservation[]>;
  isOverlapping(result: boolean): Promise<boolean>;
}
