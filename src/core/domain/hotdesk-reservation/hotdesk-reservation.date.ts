import { InvalidHotDeskReservationDateError } from './invalid-hotdeskdate.error';

export class HotDeskReservationDate {
  private readonly date: string;

  constructor(date: string) {
    this.date = date;
  }

  static create(date: string): HotDeskReservationDate {
    if (isNaN(Date.parse(date))) {
      throw InvalidHotDeskReservationDateError.withInvalidHotDeskDate();
    }

    return new HotDeskReservationDate(date);
  }

  value(): string {
    return this.date;
  }
}
