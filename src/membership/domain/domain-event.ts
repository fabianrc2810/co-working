import { EventId } from './event.id';
import { Id } from './id';

type Primitive = string | number | boolean | null | Date;
type Map = { [key: string]: Primitive };

export abstract class DomainEvent<Payload extends Map = Map> {
  readonly id: Id;
  readonly aggregateId: Id;
  readonly type: string;
  readonly payload: Payload;
  readonly occurredAt: Date;
  readonly version: number;

  protected constructor(
    aggregateId: Id,
    type: string,
    payload: Payload,
    version: number = 1,
  ) {
    this.id = EventId.create();
    this.aggregateId = aggregateId;
    this.type = type;
    this.payload = payload;
    this.occurredAt = new Date();
    this.version = version;
  }
}
