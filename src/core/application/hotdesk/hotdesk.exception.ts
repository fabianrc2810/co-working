import { HotDeskNumber } from 'src/core/domain/hotdesk/hotdesk.number';

export class HotDeskNumberDuplicatedException extends Error {
  static withHotDeskNumber(
    hotDeskNumber: HotDeskNumber,
  ): HotDeskNumberDuplicatedException {
    return new HotDeskNumberDuplicatedException(
      `Hot desk number ${hotDeskNumber.value()} already exists.`,
    );
  }
}
