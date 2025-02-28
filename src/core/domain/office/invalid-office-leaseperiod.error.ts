export class InvalidOfficeLeasePeriodError extends Error {
  errorCode: number;

  constructor(message: string, errorCode: number) {
    super(message);
    this.errorCode = errorCode;
    this.name = 'InvalidOfficeLeasePeriodError';
  }

  static withInvalidOfficeLeasePeriod(
    leasePeriod: number,
  ): InvalidOfficeLeasePeriodError {
    return new InvalidOfficeLeasePeriodError(
      `Lease period number must be a valid positive integer: ${leasePeriod}`,
      400,
    );
  }
}
