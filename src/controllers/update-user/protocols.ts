import { UpdateUserType } from "../../@types/user-params";
import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface UpdateUserControllerInterface {
  handler(
    httpRequest: HttpRequest<UpdateUserType, { userId: string }>
  ): Promise<HttpResponse<User>>;
}

export interface UpdateUserRepositoryInterface {
  updateUser: (
    body: UpdateUserType,
    params: { userId: string }
  ) => Promise<User>;
}
