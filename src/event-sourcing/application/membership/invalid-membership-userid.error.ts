import { BaseError } from '../../base-error.exception';

export class InvalidMembershipUserId extends BaseError {
  constructor(message: string) {
    super(message, 'InvalidMembershipUserId');
  }

  static withInvalidUserId(): InvalidMembershipUserId {
    return new InvalidMembershipUserId(`UserId is required`);
  }
}
