import { JwtProviderImpl } from "@infra/providers/implementations/JwtProviderImpl";
import { NextFunction, Request, Response } from "express";

import { DomainError } from "../errors/DomainError";

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const jwtProvider = new JwtProviderImpl();

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new DomainError("Token missing", 401);
  }

  const [, token] = authHeader.split("Bearer ");

  try {
    const { sub: userId } = jwtProvider.verify(token);

    request.user = {
      id: userId,
    };

    return next();
  } catch {
    throw new DomainError("Invalid token", 401);
  }
}
