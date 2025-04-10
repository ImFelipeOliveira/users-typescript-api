import { CreateUserParamsType } from "../../@types/user-params";
import { User } from "../../models/user";

export interface CreateUserRepositoryInterface {
  createUser(params: CreateUserParamsType): Promise<User>;
}
