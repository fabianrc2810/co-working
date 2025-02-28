import { InvalidOfficeNumberError } from './invalid-office-number.error';

export class OfficeNumber {
  private readonly number: number;

  constructor(number: number) {
    this.number = number;
  }

  static create(number: number): OfficeNumber {
    if (isNaN(number) || number <= 0) {
      throw InvalidOfficeNumberError.withInvalidOfficeNumber(number);
    }

    return new OfficeNumber(number);
  }

  value(): number {
    return this.number;
  }
}
