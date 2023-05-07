import { sign } from "jsonwebtoken";

import { IJwtProvider } from "../JwtProvider";

export class JwtProviderImpl implements IJwtProvider {
  generate(userId: string): string {
    const token = sign({}, process.env.JWT_SECRET_KEY, {
      subject: userId,
      expiresIn: process.env.JWT_EXPIRES_TOKEN_IN_MINUTES,
    });

    return token;
  }
}
