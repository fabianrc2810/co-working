import { BaseError } from 'src/core/exceptions/base-error.exception';

export class InvalidMembershipError extends BaseError {
  constructor(message: string) {
    super(message, 'InvalidMembershipError');
  }

  static withInvalidHotDeskNumber(userId: string): InvalidMembershipError {
    return new InvalidMembershipError(
      `A membership with that user already exists '${userId}'`,
    );
  }
}
