import { sign, verify } from "jsonwebtoken";

import { JwtProvider } from "../JwtProvider";

export interface IPayload {
  sub: string;
  exp: number;
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

  verify(token: string): IPayload {
    try {
      return verify(token, process.env.JWT_SECRET_KEY) as IPayload;
    } catch (err) {
      return null;
    }
  }
}
