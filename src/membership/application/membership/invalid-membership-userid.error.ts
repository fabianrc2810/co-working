import { BaseError } from 'src/core/exceptions/base-error.exception';

export class InvalidMembershipUserId extends BaseError {
  constructor(message: string) {
    super(message, 'InvalidMembershipUserId');
  }

  static withInvalidHotDeskNumber(): InvalidMembershipUserId {
    return new InvalidMembershipUserId(`UserId is required`);
  }
}
