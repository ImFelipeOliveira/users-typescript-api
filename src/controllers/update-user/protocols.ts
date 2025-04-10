import { UpdateUserType } from "../../@types/user-params";
import { User } from "../../models/user";

export interface UpdateUserRepositoryInterface {
  updateUser: (
    body: UpdateUserType,
    params: { userId: string }
  ) => Promise<User>;
}
