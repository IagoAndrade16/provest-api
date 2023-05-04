import { ValidationsUtils } from "@infra/validation/ValidationUtils";
import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

import { DomainError } from "./DomainError";

export async function handleErrors(
  err: Error,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): Promise<Response> {
  if (err instanceof DomainError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  if (err instanceof yup.ValidationError) {
    const yupErrors = ValidationsUtils.formatYupErrors(err);
    return response.status(400).json(yupErrors);
  }

  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`,
  });
}
