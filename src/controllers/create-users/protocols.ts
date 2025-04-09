import { User } from "../../models/user";
import { HttpResponse } from "../protocols";

export interface CreateUserControllerInterface {
  handler(): Promise<HttpResponse<string>>;
}

export interface CreateUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface CreateUserRepositoryInterface {
  createUser(params: CreateUserParams): Promise<User>;
}
