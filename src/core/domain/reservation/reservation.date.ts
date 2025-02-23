export class ReservationDate {
  private readonly date: string;

  constructor(date: string) {
    this.date = date;
  }

  static create(date: string): ReservationDate {
    return new ReservationDate(date);
  }

  value(): string {
    return this.date;
  }
}
