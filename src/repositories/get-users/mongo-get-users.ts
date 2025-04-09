import { GetUsersRepositoryInterface } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements GetUsersRepositoryInterface {
  async getUsers(): Promise<User[]> {
    return [
      {
        id: "1",
        firstName: "Felipe",
        lastName: "Souza",
        email: "teste@gmail.com",
        password: "123456",
      },
    ];
  }
}
