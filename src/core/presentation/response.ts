export class ResponseBody {
  constructor(
    public readonly status: number,
    public readonly body: any,
  ) {}

  static ok(body: any): ResponseBody {
    return new ResponseBody(200, body);
  }

  static created(body: any): ResponseBody {
    return new ResponseBody(201, body);
  }

  static noContent(): ResponseBody {
    return new ResponseBody(204, null);
  }

  static badRequest(body: any): ResponseBody {
    return new ResponseBody(400, body);
  }

  static notFound(body: any): ResponseBody {
    return new ResponseBody(404, body);
  }

  static conflict(body: any): ResponseBody {
    return new ResponseBody(409, body);
  }

  static internalServerError(body: any): ResponseBody {
    return new ResponseBody(500, body);
  }

  static unauthorized(body: any): ResponseBody {
    return new ResponseBody(401, body);
  }

  static forbidden(body: any): ResponseBody {
    return new ResponseBody(403, body);
  }
}
