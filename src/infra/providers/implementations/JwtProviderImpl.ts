import { DomainError } from "@errors/DomainError";
import { sign, verify } from "jsonwebtoken";

import { JwtProvider } from "../JwtProvider";

interface IPayload {
  sub: string;
}

export class JwtProviderImpl implements JwtProvider {
  generate(userId: string): string {
    if (!userId) return null;

    const token = sign({}, process.env.JWT_SECRET_KEY, {
      subject: userId,
      expiresIn: process.env.JWT_EXPIRES_TOKEN_IN_MINUTES,
    });

    return token;
  }

  verify(token: string): string {
    if (!token) return null;

    try {
      const verifyJwt = verify(token, process.env.JWT_SECRET_KEY) as IPayload;

      return verifyJwt.sub;
    } catch (err) {
      throw new DomainError("INVALID_TOKEN", 400);
    }
  }
}
