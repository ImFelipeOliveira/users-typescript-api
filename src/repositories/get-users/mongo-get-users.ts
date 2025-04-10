import { UserNoIdType } from "../../@types/user-params";
import { GetUsersRepositoryInterface } from "../../controllers/get-users/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements GetUsersRepositoryInterface {
  async getUsers(): Promise<User[]> {
    const users = await MongoClient.db
      .collection<UserNoIdType>("users")
      .find()
      .toArray();

    const preparedUser = await MongoClient.prepareUser(users);
    return preparedUser as User[];
  }
}
