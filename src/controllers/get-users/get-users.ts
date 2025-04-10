import { User } from "../../models/user";
import { ControllerInterface, HttpResponse } from "../protocols";
import { GetUsersRepositoryInterface } from "./protocols";

export class GetUsersController implements ControllerInterface {
  constructor(
    private readonly getUsersRepository: GetUsersRepositoryInterface
  ) {}
  async handler(): Promise<HttpResponse<User[]>> {
    try {
      const users = await this.getUsersRepository.getUsers();

      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      console.log("Error in GetUsersController: ", error);
      return {
        statusCode: 500,
        body: "Internal server error",
      };
    }
  }
}
