import { badRequest, ok, serverError } from "../helpers";
import { ControllerInterface, HttpRequest, HttpResponse } from "../protocols";
import { DeleteUserRepositoryInterface } from "./protocols";

export class DeleteUserController implements ControllerInterface {
  constructor(
    private readonly deleteUserRepository: DeleteUserRepositoryInterface
  ) {}

  async handler(
    httpRequest: HttpRequest<unknown, { userId: string }>
  ): Promise<HttpResponse<string>> {
    try {
      const { params } = httpRequest;

      if (!params || !params.userId) {
        return badRequest("Missing userId in request params");
      }

      const result = await this.deleteUserRepository.deleteUser(params);

      return ok<string>(result);
    } catch (error) {
      console.error("Error in DeleteUserController: ", error);
      return serverError();
    }
  }
}
