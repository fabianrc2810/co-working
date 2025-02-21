import { Id } from '../id';

export class HotDeskId extends Id {
  static create(): string {
    return HotDeskId.generate();
  }
}
