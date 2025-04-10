import { User } from "../../models/user";
import { ok, serverError } from "../helpers";
import { ControllerInterface, HttpResponse } from "../protocols";
import { GetUsersRepositoryInterface } from "./protocols";

export class GetUsersController implements ControllerInterface {
  constructor(
    private readonly getUsersRepository: GetUsersRepositoryInterface
  ) {}
  async handler(): Promise<HttpResponse<User[] | string>> {
    try {
      const users = await this.getUsersRepository.getUsers();

      return ok<User[]>(users);
    } catch (error) {
      console.log("Error in GetUsersController: ", error);
      return serverError();
    }
  }
}
