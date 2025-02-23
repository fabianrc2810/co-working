export class HotDeskNumber {
  private readonly number: number;

  constructor(number: number) {
    this.number = number;
  }

  static create(number: number): HotDeskNumber {
    return new HotDeskNumber(number);
  }

  value(): number {
    return this.number;
  }
}
