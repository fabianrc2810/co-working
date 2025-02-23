export class ReservationHour {
  private readonly hour: number;

  constructor(hour: number) {
    this.hour = hour;
  }

  static create(hour: number): ReservationHour {
    return new ReservationHour(hour);
  }

  value(): number {
    return this.hour;
  }
}
