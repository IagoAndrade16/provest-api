import { JwtProviderImpl } from "@infra/providers/implementations/JwtProviderImpl";
import { injectable } from "tsyringe";

@injectable()
export class TestUtils {
  static async generateBearerToken(userId: string): Promise<string> {
    const jwtProvider = new JwtProviderImpl();

    if (!userId) return null;

    const token = jwtProvider.generate(userId);

    return `Bearer ${token}`;
  }
}
