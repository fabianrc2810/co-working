import { InvalidHotDeskNumberError } from './invalid-hotdesknumber.error';

export class HotDeskNumber {
  private readonly number: number;

  constructor(number: number) {
    this.number = number;
  }

  static create(number: number): HotDeskNumber {
    if (isNaN(number) || number <= 0) {
      throw InvalidHotDeskNumberError.withInvalidHotDeskNumber(number);
    }

    return new HotDeskNumber(number);
  }

  value(): number {
    return this.number;
  }
}
