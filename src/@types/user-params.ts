import { User } from "../models/user";

export type CreateUserParamsType = Omit<User, "id">;

export type UpdateUserParamsType = {
  id: string;
  params: CreateUserParamsType;
};
