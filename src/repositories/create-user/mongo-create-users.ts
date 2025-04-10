import { UserNoIdType } from "../../@types/user-params";
import { CreateUserRepositoryInterface } from "../../controllers/create-users/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoCreateUsersRepository
  implements CreateUserRepositoryInterface
{
  async createUser(params: UserNoIdType): Promise<User> {
    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne({ ...params });

    const user = await MongoClient.db
      .collection<UserNoIdType>("users")
      .findOne({ _id: insertedId });

    if (!user) {
      throw new Error("User not created");
    }

    const preparedUser = await MongoClient.prepareUser(user);
    return preparedUser as User;
  }
}
