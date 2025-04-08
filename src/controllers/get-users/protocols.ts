import { User } from "../../models/user";
import { HttpResponse } from "../protocols";

export interface GetUsersControllerInterface {
  handler(): Promise<HttpResponse<User[]>>;
}

export interface GetUsersRepositoryInterface {
  getUsers(): Promise<User[]>;
}
