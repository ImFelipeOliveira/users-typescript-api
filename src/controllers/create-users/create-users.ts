import validator from "validator";
import { User } from "../../models/user";
import { ControllerInterface, HttpRequest, HttpResponse } from "../protocols";
import { CreateUserRepositoryInterface } from "./protocols";
import { UserNoIdType } from "../../@types/user-params";
import { badRequest, created, serverError } from "../helpers";

export class CreateUserController implements ControllerInterface {
  constructor(
    private readonly createUserRepository: CreateUserRepositoryInterface
  ) {}

  async handler(
    httpRequest: HttpRequest<UserNoIdType>
  ): Promise<HttpResponse<User | string>> {
    try {
      const { body } = httpRequest;

      if (!body || Object.keys(body!).length === 0) {
        return badRequest("Missing request body");
      }

      for (const key in body) {
        if (!body?.[key as keyof UserNoIdType]?.length) {
          return badRequest(`Missing parameter ${key}`);
        }
      }

      const emailIsValid = validator.isEmail(body.email);
      if (!emailIsValid) {
        return badRequest("Invalid email");
      }

      const user = await this.createUserRepository.createUser(body!);

      return created<User>(user);
    } catch (error) {
      console.log("Error in CreateUserController: ", error);
      return serverError();
    }
  }
}
