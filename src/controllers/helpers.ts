import { HttpResponse, StatusCode } from "./protocols";

export const ok = <T>(body: T): HttpResponse<T> => {
  return {
    statusCode: StatusCode.OK,
    body: body,
  };
};

export const created = <T>(body: T): HttpResponse<T> => {
  return {
    statusCode: StatusCode.CREATED,
    body: body,
  };
};

export const badRequest = (message: string): HttpResponse<string> => {
  return {
    statusCode: StatusCode.BAD_REQUEST,
    body: message,
  };
};

export const notFound = (message: string): HttpResponse<string> => {
  return {
    statusCode: StatusCode.NOT_FOUND,
    body: message,
  };
};

export const serverError = (): HttpResponse<string> => {
  return {
    statusCode: StatusCode.INTERNAL_SERVER_ERROR,
    body: "Internal server error",
  };
};
