import { HotDesk } from 'src/core/domain/hotdesk/hotdesk';
import { HotDeskNumber } from './hotdesk.number';
export const HOTDESK_REPOSITORY = 'HOTDESK_REPOSITORY'; // Token de inyección

export interface HotDeskRepository {
  exists(number: HotDeskNumber): Promise<boolean>;
  save(hotDesk: HotDesk): Promise<void>;
}
