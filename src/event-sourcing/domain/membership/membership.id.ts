import { Id } from '../id';

export class MembershipId extends Id {
  protected constructor(readonly value: string) {
    super(value);
  }

  static create(value: string): MembershipId {
    return new MembershipId(value);
  }

  static empty(): MembershipId {
    return new MembershipId('');
  }
}
