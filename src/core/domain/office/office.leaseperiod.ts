import { InvalidOfficeLeasePeriodError } from './invalid-office-leaseperiod.error';

export class OfficeLeasePeriod {
  private readonly number: number;

  constructor(number: number) {
    this.number = number;
  }

  static create(number: number): OfficeLeasePeriod {
    if (isNaN(number) || number <= 0) {
      console.log('error');
      throw InvalidOfficeLeasePeriodError.withInvalidOfficeLeasePeriod(number);
    }
    return new OfficeLeasePeriod(number);
  }

  static default(): OfficeLeasePeriod {
    return new OfficeLeasePeriod(12);
  }

  value(): number {
    return this.number;
  }
}
