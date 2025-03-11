import { DomainEvent } from 'src/event-sourcing/domain/domain-event';
import { EventPublisher } from 'src/event-sourcing/domain/event-publisher';

export class SimpleEventPublisher implements EventPublisher {
  publish(events: DomainEvent[]): void {
    console.log(events);
  }
}
