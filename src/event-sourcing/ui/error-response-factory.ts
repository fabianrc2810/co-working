import { HttpException, HttpStatus } from '@nestjs/common';
import { InvalidMembershipUserId } from '../application/membership/invalid-membership-userid.error';
import { InvalidMembershipExistsError } from '../application/membership/invalid-membership-exists.error';
import { InvalidMembershipNotFoundError } from '../application/membership/invalid-membership-not-found.error';

type ErrorClass = new (...args: any[]) => Error;

type ErrorMapping = {
  status: HttpStatus;
  code: string;
};

const errorMappings = new Map<ErrorClass, ErrorMapping>([
  [
    InvalidMembershipUserId,
    { status: HttpStatus.BAD_REQUEST, code: 'INVALID_MEMBERSHIP_USERID' },
  ],
  [
    InvalidMembershipExistsError,
    { status: HttpStatus.CONFLICT, code: 'INVALID_MEMBERSHIP_EXISTS' },
  ],
  [
    InvalidMembershipNotFoundError,
    { status: HttpStatus.NOT_FOUND, code: 'INVALID_MEMBERSHIP_NOT_FOUND' },
  ],
]);

export class ErrorResponseFactory {
  static create(error: Error): HttpException {
    const errorConstructor = error.constructor as ErrorClass;
    const mapping = errorMappings.get(errorConstructor);
    if (mapping) {
      return new HttpException(
        { message: error.message, code: mapping.code },
        mapping.status,
      );
    }
    return new HttpException(
      { message: 'Internal server error', code: 'INTERNAL_SERVER_ERROR' },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
