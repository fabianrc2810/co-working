import { Id } from '../id';

export class MembershipUserId extends Id {
  protected constructor(readonly value: string) {
    super(value);
  }

  static create(value: string): MembershipUserId {
    return new MembershipUserId(value);
  }

  static empty(): MembershipUserId {
    return new MembershipUserId('');
  }
}
