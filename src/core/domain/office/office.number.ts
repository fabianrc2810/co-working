export class OfficeNumber {
  private readonly number: number;

  constructor(number: number) {
    this.number = number;
  }

  static create(number: number): OfficeNumber {
    return new OfficeNumber(number);
  }

  value(): number {
    return this.number;
  }
}
