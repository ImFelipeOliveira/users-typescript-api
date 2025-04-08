import {
  GetUsersControllerInterface,
  GetUsersRepositoryInterface,
} from "./protocols";

export class GetUsersController implements GetUsersControllerInterface {
  constructor(
    private readonly getUsersRepository: GetUsersRepositoryInterface
  ) {}
  async handler() {
    try {
      const users = await this.getUsersRepository.getUsers();

      return {
        statusCode: 200,
        body: users,
      };
    } catch (error: string | unknown) {
      console.log("Error in GetUsersController: ", error);
      return {
        statusCode: 500,
        body: "Internal server error",
      };
    }
  }
}
