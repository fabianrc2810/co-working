export class OfficeLeasePeriod {
  private readonly number: number;

  constructor(number: number) {
    this.number = number;
  }

  static create(number: number): OfficeLeasePeriod {
    return new OfficeLeasePeriod(number);
  }

  value(): number {
    return this.number;
  }
}
