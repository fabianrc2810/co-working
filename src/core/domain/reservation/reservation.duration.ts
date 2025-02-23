export class ReservationDuration {
  private readonly duration: number;

  constructor(duration: number) {
    this.duration = duration;
  }

  static create(duration: number): ReservationDuration {
    return new ReservationDuration(duration);
  }

  value(): number {
    return this.duration;
  }
}
