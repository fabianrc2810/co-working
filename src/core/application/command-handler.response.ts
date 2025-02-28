import { HttpException, HttpStatus } from '@nestjs/common';

export class CommandHandlerResponse {
  constructor(
    public readonly status: number,
    public readonly body: any,
  ) {}

  static created(body: any): CommandHandlerResponse {
    return new CommandHandlerResponse(201, body);
  }

  static conflict(body: any): CommandHandlerResponse {
    return new CommandHandlerResponse(409, body);
  }

  static throwError(error: Error): HttpException {
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || 'Internal Server Error';
    const responseBody = {
      statusCode,
      message,
      error: 'Internal Server Error',
    };

    // You can customize the status code depending on the error type
    // if (error instanceof SomeSpecificError) {
    //   responseBody.statusCode = HttpStatus.BAD_REQUEST; // Example: if specific error
    //   responseBody.error = 'Bad Request';
    // }

    throw new HttpException(responseBody, responseBody.statusCode);
  }
}
