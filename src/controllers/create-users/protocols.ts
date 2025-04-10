import { UserNoMongoIdType } from "../../@types/user-params";
import { User } from "../../models/user";

export interface CreateUserRepositoryInterface {
  createUser(params: UserNoMongoIdType): Promise<User>;
}
