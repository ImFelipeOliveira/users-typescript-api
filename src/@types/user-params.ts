import { User } from "../models/user";

export type UserNoIdType = Omit<User, "id">;

export type UpdateUserType = {
  firstName?: string;
  lastName?: string;
  password?: string;
};
