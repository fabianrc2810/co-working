import { BadRequestException } from '@nestjs/common';

export class OfficeNumber {
  private readonly number: number;

  constructor(number: number) {
    this.number = number;
  }

  static create(number: number): OfficeNumber {
    if (isNaN(number) || number <= 0) {
      throw new BadRequestException('Number must be a valid positive integer.');
    }

    return new OfficeNumber(number);
  }

  value(): number {
    return this.number;
  }
}
