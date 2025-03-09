import { DomainEvent } from './domain-event';

export const EVENT_PUBLISHER_REPOSITORY = 'EventPublisher';

export interface EventPublisher {
  publish(events: DomainEvent[]): void;
}
