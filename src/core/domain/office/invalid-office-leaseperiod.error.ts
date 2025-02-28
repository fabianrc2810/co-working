import { BaseError } from 'src/core/exceptions/base-error.exception';

export class InvalidOfficeLeasePeriodError extends BaseError {
  constructor(message: string) {
    super(message, 'InvalidOfficeLeasePeriodError');
  }

  static withInvalidOfficeLeasePeriod(
    leasePeriod: number,
  ): InvalidOfficeLeasePeriodError {
    return new InvalidOfficeLeasePeriodError(
      `Lease period must be a valid positive integer: ${leasePeriod}`,
    );
  }
}
