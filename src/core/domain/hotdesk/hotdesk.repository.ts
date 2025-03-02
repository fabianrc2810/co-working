import { HotDesk } from 'src/core/domain/hotdesk/hotdesk';
import { HotDeskNumber } from './hotdesk.number';
import { HotDeskId } from './hotdesk.id';
export const HOTDESK_REPOSITORY = 'HOTDESK_REPOSITORY'; // Token de inyección

export interface HotDeskRepository {
  exists(number: HotDeskNumber): Promise<boolean>;
  save(hotDesk: HotDesk): Promise<void>;
  findAvailable(): Promise<HotDesk | null>;
  markAsAssigned(hotDeskId: HotDeskId): Promise<void>;
}
