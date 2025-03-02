import { Reservation } from 'src/core/domain/reservation/reservation';
import {
  RESERVATION_REPOSITORY,
  ReservationRepository,
} from 'src/core/domain/reservation/reservation.repository';
import { ReservationDTO } from './dto/reservation.dto';
import { Inject } from '@nestjs/common';
import {
  MEETING_ROOM_REPOSITORY,
  MeetingRoomRepository,
} from 'src/core/domain/meeting-room/meeting-room.repository';
import { ReservationError } from './reservation.exception';
import { ReservationMeetingRoomId } from 'src/core/domain/reservation/reservation.meeting-room-id';
import { ReservationUserId } from 'src/core/domain/reservation/reservation.userid';
import { ReservationDate } from 'src/core/domain/reservation/reservation.date';
import { ReservationHour } from 'src/core/domain/reservation/reservation.hour';
import { ReservationDuration } from 'src/core/domain/reservation/reservation.duration';
import { isOverlapping } from 'src/core/domain/reservation/is-overlapping.reservation';
import {
  HOTDESK_REPOSITORY,
  HotDeskRepository,
} from 'src/core/domain/hotdesk/hotdesk.repository';
import { ReservationMeetingRoomError } from './reservation-meeting-room.exception';

export class CreateReservationCommandHandler {
  constructor(
    @Inject(RESERVATION_REPOSITORY)
    private readonly reservationRepository: ReservationRepository,
    @Inject(MEETING_ROOM_REPOSITORY)
    private readonly meetingRoomRepository: MeetingRoomRepository,
    @Inject(HOTDESK_REPOSITORY)
    private readonly hotDeskRepository: HotDeskRepository,
  ) {}

  async handle(createReservation: ReservationDTO): Promise<void> {
    const meetingRoomId = ReservationMeetingRoomId.create(
      createReservation.meetingRoomId,
    );
    const userId = ReservationUserId.create(createReservation.userId);
    const date = ReservationDate.create(createReservation.date);
    const hour = ReservationHour.create(createReservation.hour);
    const duration = ReservationDuration.create(createReservation.duration);

    await this.checkMeetingRoom(meetingRoomId);

    const reservationDate = new Date(date.value());
    const reservationHour = hour.value();
    this.checkReservationTime(reservationDate, reservationHour);

    const activeReservations =
      await this.reservationRepository.findActiveByMeetingRoomAndDate(
        createReservation.meetingRoomId,
        createReservation.date,
      );

    this.checkOverlapping(
      reservationHour,
      duration.value(),
      activeReservations,
    );

    const reservation = new Reservation(
      meetingRoomId,
      userId,
      date,
      hour,
      duration,
    );

    await this.reservationRepository.save(reservation);
    await this.assignHotDesk(reservation);
  }

  async checkMeetingRoom(
    meetingRoomId: ReservationMeetingRoomId,
  ): Promise<void> {
    const meetingRoom = await this.meetingRoomRepository.findById(
      meetingRoomId.value(),
    );

    if (!meetingRoom) {
      throw ReservationMeetingRoomError.withMeetingRoomByIdNotFound(
        meetingRoomId,
      );
    }
  }

  async assignHotDesk(savedReservation: Reservation): Promise<void> {
    const availableHotDesk = await this.hotDeskRepository.findAvailable();
    if (availableHotDesk) {
      availableHotDesk.status = this.hotDeskRepository.markAsAssigned(
        availableHotDesk.id,
      );
      await this.hotDeskRepository.save(availableHotDesk);

      savedReservation.hotDeskId = availableHotDesk;

      await this.reservationRepository.update(savedReservation);
    }
  }

  checkOverlapping(
    reservationHour: number,
    reservationDuration: number,
    activeReservations: Reservation[],
  ): void {
    const newHour = reservationHour;
    const newDuration = reservationDuration;

    for (const existingReservation of activeReservations) {
      const existingHour = existingReservation.hour.value();
      const existingDuration = existingReservation.duration.value();

      if (isOverlapping(newHour, newDuration, existingHour, existingDuration)) {
        throw ReservationError.withMeetingRoomIsOverlapping();
      }
    }
  }

  checkReservationTime(reservationDate: Date, reservationHour: number): void {
    const now = new Date();
    if (reservationDate.toDateString() === now.toDateString()) {
      const nextAvailableHour = now.getHours() + 1;
      if (reservationHour < nextAvailableHour) {
        throw ReservationError.withMeetingRoomValidateReservationTime(
          nextAvailableHour,
        );
      }
    }
  }
}
