import { BaseError } from '../../base-error.exception';

export class InvalidMembershipExistsError extends BaseError {
  constructor(message: string) {
    super(message, 'InvalidMembershipError');
  }

  static withInvalidMembership(userId: string): InvalidMembershipExistsError {
    return new InvalidMembershipExistsError(
      `A membership with that user already exists '${userId}'`,
    );
  }
}
