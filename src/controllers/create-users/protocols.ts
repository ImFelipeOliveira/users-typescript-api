import { CreateUserParamsType } from "../../@types/user-params";
import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface CreateUserControllerInterface {
  handler(
    httpRequest: HttpRequest<CreateUserParamsType>
  ): Promise<HttpResponse<User>>;
}

export interface CreateUserRepositoryInterface {
  createUser(params: CreateUserParamsType): Promise<User>;
}
