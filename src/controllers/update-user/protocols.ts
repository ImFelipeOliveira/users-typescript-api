import { UpdateUserParamsType } from "../../@types/user-params";
import { User } from "../../models/user";

export interface UpdateUserRepositoryInterface {
  updateUser: (
    body: UpdateUserParamsType,
    params: { userId: string }
  ) => Promise<User>;
}
