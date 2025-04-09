export interface HttpResponse<T> {
  statusCode: number;
  body: T | string;
}

export interface HttpRequest<B, P = unknown, H = unknown> {
  body?: B;
  params?: P;
  headers?: H;
  method?: string;
}
