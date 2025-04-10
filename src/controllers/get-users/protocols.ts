import { User } from "../../models/user";

export interface GetUsersRepositoryInterface {
  getUsers(): Promise<User[]>;
}
