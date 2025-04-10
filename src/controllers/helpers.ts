import { HttpResponse } from "./protocols";

export const ok = <T>(body: T): HttpResponse<T> => {
  return {
    statusCode: 200,
    body: body,
  };
};

export const created = <T>(body: T): HttpResponse<T> => {
  return {
    statusCode: 201,
    body: body,
  };
};

export const badRequest = (message: string): HttpResponse<string> => {
  return {
    statusCode: 400,
    body: message,
  };
};

export const notFound = (message: string): HttpResponse<string> => {
  return {
    statusCode: 404,
    body: message,
  };
};

export const serverError = (): HttpResponse<string> => {
  return {
    statusCode: 500,
    body: "Internal server error",
  };
};
