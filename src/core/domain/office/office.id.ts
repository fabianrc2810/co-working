import { Id } from '../id';

export class OfficeId extends Id {
  static create(): string {
    return OfficeId.generate();
  }
}
