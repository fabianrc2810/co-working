import { Id } from '../../domain/id';

export class PackageId extends Id {
  protected constructor(value: string) {
    super(value);
  }

  static create(value?: string): PackageId {
    return new PackageId(value ?? Id.generate());
  }
}
