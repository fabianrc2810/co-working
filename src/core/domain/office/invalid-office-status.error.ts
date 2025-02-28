import { BaseError } from 'src/core/exceptions/base-error.exception';

export class InvalidOfficeStatusError extends BaseError {
  constructor(message: string) {
    super(message, 'InvalidOfficeStatusError');
  }
  static withInvalidOfficeStatus(status: string): InvalidOfficeStatusError {
    return new InvalidOfficeStatusError(
      `Status must be 'Activo' or 'Inactivo': '${status}'.`,
    );
  }
}
