import validator from "validator";
import { User } from "../../models/user";
import { ControllerInterface, HttpRequest, HttpResponse } from "../protocols";
import { CreateUserRepositoryInterface } from "./protocols";
import { CreateUserParamsType } from "../../@types/user-params";

export class CreateUserController implements ControllerInterface {
  constructor(
    private readonly createUserRepository: CreateUserRepositoryInterface
  ) {}

  async handler(
    httpRequest: HttpRequest<CreateUserParamsType>
  ): Promise<HttpResponse<User>> {
    try {
      const { body } = httpRequest;

      if (!body || Object.keys(body!).length === 0) {
        return {
          statusCode: 400,
          body: "Missing request body",
        };
      }

      for (const key in body) {
        if (!body?.[key as keyof CreateUserParamsType]?.length) {
          return {
            statusCode: 400,
            body: `Missing parameter ${key}`,
          };
        }
      }

      const emailIsValid = validator.isEmail(body.email);
      if (!emailIsValid) {
        return {
          statusCode: 400,
          body: "Invalid email",
        };
      }

      const user = await this.createUserRepository.createUser(body!);

      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      console.log("Error in CreateUserController: ", error);
      return {
        statusCode: 500,
        body: "Internal server error",
      };
    }
  }
}
