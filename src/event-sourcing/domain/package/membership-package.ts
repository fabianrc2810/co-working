import { PackageId } from './package.id';

export class MembershipPackage {
  constructor(
    readonly packageId: PackageId,
    readonly credits: number,
    readonly startDate: Date,
    readonly endDate: Date,
  ) {}
}
