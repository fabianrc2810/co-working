export class MembershipStatus {
  constructor(readonly value: string) {}

  static empty(): MembershipStatus {
    return new MembershipStatus('');
  }

  static completed(): MembershipStatus {
    return new MembershipStatus('COMPLETED');
  }
}
