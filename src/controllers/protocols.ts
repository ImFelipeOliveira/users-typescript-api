export interface HttpResponse<T> {
  statusCode: number;
  body: T | string;
}

export interface HttpRequest<B = unknown, P = unknown, H = unknown> {
  body?: B;
  params?: P;
  headers?: H;
  method?: string;
}

export interface ControllerInterface {
  handler(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}
