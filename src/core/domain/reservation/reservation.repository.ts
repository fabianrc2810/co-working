import { Reservation } from './reservation';
export const RESERVATION_REPOSITORY = 'RESERVATION_REPOSITORY';

export interface ReservationRepository {
  validDate(date: string): Promise<boolean>;
  validHour(hour: number): Promise<boolean>;
  validDuration(duration: number): Promise<boolean>;
  validUser(userId: string): Promise<boolean>;
  save(reservation: Reservation): Promise<Reservation>;
  findActiveByMeetingRoomAndDate(
    meetingRoomId: string,
    date: string,
  ): Promise<Reservation[]>;
}
