import { DomainEvent } from 'src/membership/domain/domain-event';
import { EventPublisher } from 'src/membership/domain/event-publisher';

export class SimpleEventPublisher implements EventPublisher {
  publish(events: DomainEvent[]): void {
    console.log(events);
  }
}
