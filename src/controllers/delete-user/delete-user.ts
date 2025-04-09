import { HttpRequest, HttpResponse } from "../protocols";
import {
  DeleteUserControllerInterface,
  DeleteUserRepositoryInterface,
} from "./protocols";

export class DeleteUserController implements DeleteUserControllerInterface {
  constructor(
    private readonly deleteUserRepository: DeleteUserRepositoryInterface
  ) {}

  async handler(
    httpRequest: HttpRequest<unknown, { userId: string }>
  ): Promise<HttpResponse<string>> {
    try {
      const { params } = httpRequest;

      if (!params || !params.userId) {
        return {
          statusCode: 400,
          body: "Missing userId in request params",
        };
      }

      const result = await this.deleteUserRepository.deleteUser(params);

      return {
        statusCode: 200,
        body: result,
      };
    } catch (error) {
      console.error("Error in DeleteUserController: ", error);
      return {
        statusCode: 500,
        body: "Internal server error",
      };
    }
  }
}
