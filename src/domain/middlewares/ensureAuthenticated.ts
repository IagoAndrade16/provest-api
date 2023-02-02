import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "../../infra/config/auth";
import { DomainError } from "../errors/DomainError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new DomainError("Token missing", 401);
  }

  const [, token] = authHeader.split("Bearer ");

  try {
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

    request.user = {
      id: user_id,
    };

    return next();
  } catch {
    throw new DomainError("Invalid token", 401);
  }
}
