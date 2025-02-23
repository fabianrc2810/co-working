import { HttpException } from '@nestjs/common';

export class HttpConflictException extends HttpException {
  constructor(message: string) {
    super(message, 498);
  }
}
