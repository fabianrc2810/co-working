import { Id } from './id';

export class EventId extends Id {
  static create(): EventId {
    return new EventId(Id.generate());
  }
}
