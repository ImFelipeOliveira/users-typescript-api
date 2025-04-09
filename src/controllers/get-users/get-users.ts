import { User } from "../../models/user";
import { HttpResponse } from "../protocols";
import {
  GetUsersControllerInterface,
  GetUsersRepositoryInterface,
} from "./protocols";

export class GetUsersController implements GetUsersControllerInterface {
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
