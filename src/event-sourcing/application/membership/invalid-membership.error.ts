import { BaseError } from './../../base-error.exception';

export class InvalidMembershipError extends BaseError {
  constructor(message: string) {
    super(message, 'InvalidMembershipError');
  }

  static withInvalidMembership(userId: string): InvalidMembershipError {
    return new InvalidMembershipError(
      `A membership with that user already exists '${userId}'`,
    );
  }

  static withMembershipNotFound(userId: string): InvalidMembershipError {
    return new InvalidMembershipError(
      `Membership not found for user '${userId}'`,
    );
  }
}
