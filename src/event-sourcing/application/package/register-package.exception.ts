import { BaseError } from '../../base-error.exception';

export class RegisterPackageError extends BaseError {
  constructor(message: string) {
    super(message, 'RegisterPackageError');
  }

  static withInvalidMembershipId(): RegisterPackageError {
    return new RegisterPackageError('MembershipId must be necessary');
  }

  static withInvalidCredits(): RegisterPackageError {
    return new RegisterPackageError('Credits must be greater than 0');
  }

  static withInvalidYear(): RegisterPackageError {
    return new RegisterPackageError('Invalid year');
  }

  static withInvalidMonthYear(): RegisterPackageError {
    return new RegisterPackageError('Month must be between 1 and 12');
  }

  static withInvalidMembershipNotFound(
    membershipId: string,
  ): RegisterPackageError {
    return new RegisterPackageError(
      `A membership with that ID is not found '${membershipId}'`,
    );
  }
}
