import { Id } from '../../domain/id';

export class PackageId extends Id {
  protected constructor(value: string) {
    super(value);
  }

  static create(value?: string): PackageId {
    return new PackageId(value ?? Id.generate());
  }
}

export class MembershipPackage {
  constructor(
    readonly packageId: PackageId,
    readonly credits: number,
    readonly startDate: Date,
    readonly endDate: Date,
  ) {}
}
