import {
  CreateUserParamsType,
  UpdateUserParamsType,
} from "../../@types/user-params";
import { User } from "../../models/user";
import { ControllerInterface, HttpRequest, HttpResponse } from "../protocols";
import { UpdateUserRepositoryInterface } from "./protocols";

export class UpdateUserController implements ControllerInterface {
  constructor(
    private readonly updateUserRepository: UpdateUserRepositoryInterface
  ) {}
  async handler(
    httpRequest: HttpRequest<UpdateUserParamsType, { userId: string }>
  ): Promise<HttpResponse<User>> {
    try {
      const { body, params } = httpRequest;

      if (!params || !params.userId) {
        return {
          statusCode: 400,
          body: "Missing userId in request params",
        };
      }

      if (!body || Object.keys(body!).length === 0) {
        return {
          statusCode: 400,
          body: "Missing request body",
        };
      }

      const allowedKeys: (keyof Partial<CreateUserParamsType>)[] = [
        "firstName",
        "lastName",
        "password",
      ];
      const InvalidKeys = Object.keys(body!).some(
        (key) => !allowedKeys.includes(key as keyof CreateUserParamsType)
      );

      if (InvalidKeys) {
        return {
          statusCode: 400,
          body: "Invalid keys in request body",
        };
      }
      const user = await this.updateUserRepository.updateUser(body!, params);
      return {
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      console.log("Error in UpdateUserController: ", error);
      return {
        statusCode: 500,
        body: "Internal server error",
      };
    }
  }
}
