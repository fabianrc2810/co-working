export class MembershipSummaryReadModel {
  constructor(
    readonly id: string,
    readonly userId: string,
    readonly totalCredits: number,
  ) {}
}
