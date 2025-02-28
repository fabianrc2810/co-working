import { OfficeNumber } from 'src/core/domain/office/office.number';

export class OfficeNumberDuplicatedException extends Error {
  static withOfficeNumber(
    officeNumber: OfficeNumber,
  ): OfficeNumberDuplicatedException {
    return new OfficeNumberDuplicatedException(
      `Office number ${officeNumber.value()} already exists.`,
    );
  }
}
