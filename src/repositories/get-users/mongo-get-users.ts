import { GetUsersRepositoryInterface } from "../../controllers/get-users/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements GetUsersRepositoryInterface {
  async getUsers(): Promise<User[]> {
    const users = await MongoClient.db
      .collection<UserNoMongoIdType>("users")
      .find()
      .toArray();

    return users.map(({ _id, ...rest }) => ({ id: _id.toString(), ...rest }));
  }
}
