export interface HttpResponse<T> {
  statusCode: StatusCode;
  body: T | string;
}

export interface HttpRequest<B = unknown, P = unknown, H = unknown> {
  body?: B;
  params?: P;
  headers?: H;
  method?: string;
}

export enum StatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
export interface ControllerInterface {
  handler(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}
