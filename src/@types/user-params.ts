import { User } from "../models/user";

export type CreateUserParamsType = Omit<User, "id">;

export type UpdateUserParamsType = {
  firstName?: string;
  lastName?: string;
  password?: string;
};
