import { OfficeNumber } from 'src/core/domain/office/office.number';
import { BaseError } from 'src/core/exceptions/base-error.exception';

export class OfficeNumberDuplicatedException extends BaseError {
  constructor(message: string) {
    super(message, 'OfficeNumberDuplicatedException');
  }

  static withOfficeNumber(
    officeNumber: OfficeNumber,
  ): OfficeNumberDuplicatedException {
    return new OfficeNumberDuplicatedException(
      `Office number ${officeNumber.value()} already exists.`,
    );
  }
}
