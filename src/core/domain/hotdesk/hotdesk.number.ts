export class HotDeskNumber {
  private readonly number: number;

  constructor(number: number) {
    this.number = number;
  }

  static create(number: number): HotDeskNumber {
    if (!Number.isInteger(number) || number <= 0) {
      throw new Error('Invalid number provided.');
    }

    return new HotDeskNumber(number);
  }

  value(): number {
    return this.number;
  }
}
