import { BaseError } from '../../base-error.exception';

export class InvalidMembershipNotFoundError extends BaseError {
  constructor(message: string) {
    super(message, 'InvalidMembershipError');
  }

  static withMembershipNotFound(
    userId: string,
  ): InvalidMembershipNotFoundError {
    return new InvalidMembershipNotFoundError(
      `Membership not found for user '${userId}'`,
    );
  }
}
