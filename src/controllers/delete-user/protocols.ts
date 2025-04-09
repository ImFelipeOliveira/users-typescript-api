import { HttpRequest, HttpResponse } from "../protocols";

export interface DeleteUserControllerInterface {
  handler(
    httpRequest: HttpRequest<unknown, { userId: string }>
  ): Promise<HttpResponse<string>>;
}

export interface DeleteUserRepositoryInterface {
  deleteUser: (params: { userId: string }) => Promise<string>;
}
