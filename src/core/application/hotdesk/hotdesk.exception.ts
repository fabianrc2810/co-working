import { HotDeskNumber } from 'src/core/domain/hotdesk/hotdesk.number';
import { BaseError } from 'src/core/exceptions/base-error.exception';

export class HotDeskNumberDuplicatedException extends BaseError {
  constructor(message: string) {
    super(message, 'HotDeskNumberDuplicatedException');
  }

  static withHotDeskNumber(
    hotDeskNumber: HotDeskNumber,
  ): HotDeskNumberDuplicatedException {
    return new HotDeskNumberDuplicatedException(
      `Hot desk number ${hotDeskNumber.value()} already exists.`,
    );
  }
}
