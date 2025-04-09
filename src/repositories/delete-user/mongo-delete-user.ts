import { ObjectId } from "mongodb";
import { DeleteUserRepositoryInterface } from "../../controllers/delete-user/protocols";
import { MongoClient } from "../../database/mongo";

export class MongoDeleteUserRepository
  implements DeleteUserRepositoryInterface
{
  async deleteUser(params: { userId: string }): Promise<string> {
    try {
      const { userId } = params;

      const { deletedCount } = await MongoClient.db
        .collection("users")
        .deleteOne({
          _id: new ObjectId(userId),
        });

      if (deletedCount === 0) {
        return "User not found";
      }

      return "User deleted successfully";
    } catch (error) {
      console.log("Error in MongoDeleteUserRepository: ", error);
      throw new Error("Internal server error");
    }
  }
}
