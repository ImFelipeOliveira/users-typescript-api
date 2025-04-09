import { UpdateUserParamsType } from "../../@types/user-params";
import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface UpdateUserControllerInterface {
  handler(
    httpRequest: HttpRequest<UpdateUserParamsType>
  ): Promise<HttpResponse<User>>;
}

export interface UpdateUserRepositoryInterface {
  updateUser: (params: Partial<UpdateUserParamsType>) => Promise<User>;
}
