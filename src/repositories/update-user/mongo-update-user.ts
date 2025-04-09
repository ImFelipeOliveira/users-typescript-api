import { MongoClient } from "../../database/mongo";
import { UpdateUserType } from "../../@types/user-params";
import { UpdateUserRepositoryInterface } from "../../controllers/update-user/protocols";
import { User } from "../../models/user";
import { ObjectId } from "mongodb";

export class MongoUpdateUserRepository
  implements UpdateUserRepositoryInterface
{
  async updateUser(
    body: UpdateUserType,
    params: { userId: string }
  ): Promise<User> {
    const id = params.userId;
    const { ...rest } = body;

    try {
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

      const { _id, ...restUser } = user!;
      return { id: _id.toString(), ...restUser };
    } catch (error) {
      console.error("Error in MongoUpdateUserRepository: ", error);
      throw new Error("Internal server error");
    }
  }
}
