import {
  CreateUserParams,
  CreateUserRepositoryInterface,
} from "../../controllers/create-users/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoCreateUsersRepository
  implements CreateUserRepositoryInterface
{
  async createUser(params: CreateUserParams): Promise<User> {
    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne({ params });

    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: insertedId });

    if (!user) {
      throw new Error("User not created");
    }
    const { _id, ...rest } = user;
    return { ...rest, id: _id.toString() };
  }
}
