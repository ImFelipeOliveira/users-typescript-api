import { UserNoIdType } from "../../@types/user-params";
import { User } from "../../models/user";

export interface CreateUserRepositoryInterface {
  createUser(params: UserNoIdType): Promise<User>;
}
