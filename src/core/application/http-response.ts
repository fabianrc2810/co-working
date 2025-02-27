export class HttpResponse {
  constructor(
    public readonly status: number,
    public readonly body: any,
  ) {}

  static created(body: any): HttpResponse {
    return new HttpResponse(201, body);
  }

  static conflict(body: any): HttpResponse {
    return new HttpResponse(498, body);
  }

  static internalServerError(body: any): HttpResponse {
    return new HttpResponse(500, body);
  }
}
