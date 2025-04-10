import { User } from "../models/user";

export type UserNoMongoIdType = Omit<User, "id">;

export type UpdateUserType = {
  firstName?: string;
  lastName?: string;
  password?: string;
};
