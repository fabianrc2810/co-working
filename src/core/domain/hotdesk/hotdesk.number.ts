import { BadRequestException } from '@nestjs/common';

export class HotDeskNumber {
  private readonly number: number;

  constructor(number: number) {
    this.number = number;
  }

  static create(number: number): HotDeskNumber {
    if (isNaN(number) || number <= 0) {
      throw new BadRequestException(
        'HotDesk number must be a valid positive integer.',
      );
    }

    return new HotDeskNumber(number);
  }

  value(): number {
    return this.number;
  }
}
