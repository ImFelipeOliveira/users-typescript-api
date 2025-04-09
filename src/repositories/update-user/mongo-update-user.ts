import { ObjectId } from "mongodb";
import { UpdateUserParamsType } from "../../@types/user-params";
import { UpdateUserRepositoryInterface } from "../../controllers/update-user/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoUpdateUserRepository
  implements UpdateUserRepositoryInterface
{
  async updateUser(params: Partial<UpdateUserParamsType>): Promise<User> {
    const { id, ...rest } = params;
    const { matchedCount, modifiedCount } = await MongoClient.db
      .collection("users")
      .updateOne({ _id: new ObjectId(id) }, { $set: { ...rest } });

    if (matchedCount === 0) {
      throw new Error("User not found");
    }
    if (modifiedCount === 0) {
      throw new Error("User not updated");
    }
    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: new ObjectId(id) });
    if (!user) {
      throw new Error("User not found");
    }
    const { _id, ...restUser } = user;
    return { id: _id.toString(), ...restUser };
  }
}
