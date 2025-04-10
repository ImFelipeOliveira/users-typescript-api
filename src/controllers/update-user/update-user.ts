import { UserNoMongoIdType } from "../../@types/user-params";
import { User } from "../../models/user";
import { badRequest, ok, serverError } from "../helpers";
import { ControllerInterface, HttpRequest, HttpResponse } from "../protocols";
import { UpdateUserRepositoryInterface } from "./protocols";

export class UpdateUserController implements ControllerInterface {
  constructor(
    private readonly updateUserRepository: UpdateUserRepositoryInterface
  ) {}
  async handler(
    httpRequest: HttpRequest<UserNoMongoIdType, { userId: string }>
  ): Promise<HttpResponse<User | string>> {
    try {
      const { body, params } = httpRequest;

      if (!params || !params.userId) {
        return badRequest("Missing userId in request params");
      }

      if (!body || Object.keys(body!).length === 0) {
        return badRequest("Missing request body");
      }

      const allowedKeys: (keyof Partial<UserNoMongoIdType>)[] = [
        "firstName",
        "lastName",
        "password",
      ];
      const InvalidKeys = Object.keys(body!).some(
        (key) => !allowedKeys.includes(key as keyof UserNoMongoIdType)
      );

      if (InvalidKeys) {
        return badRequest("Invalid keys in request body");
      }
      const user = await this.updateUserRepository.updateUser(body!, params);

      return ok<User>(user);
    } catch (error) {
      console.log("Error in UpdateUserController: ", error);
      return serverError();
    }
  }
}
