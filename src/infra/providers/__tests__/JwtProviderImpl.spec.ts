import { TestUtils } from "../../../domain/utils/TestUtils";
import { JwtProviderImpl } from "../implementations/JwtProviderImpl";
import { IJwtProvider } from "../JwtProvider";

let jwtProvider: IJwtProvider;
let authToken: string;

beforeAll(async () => {
  jwtProvider = new JwtProviderImpl();
  authToken = await TestUtils.generateBearerToken("-1");
});

describe("verify", () => {
  it("should return null if token missing", async () => {
    const sub = jwtProvider.verify(null);

    expect(sub).toBe(null);
  });

  // TODO: Teste para verificar um token invalido

  it("should be return sub", () => {
    const sub = jwtProvider.verify(authToken.split("Bearer ")[1]);

    expect(sub).toBe("-1");
  });
});

describe("generate", () => {
  it("should return null if !userId", async () => {
    const token = jwtProvider.generate(null);

    expect(token).toBe(null);
  });

  it("should return a valid token", async () => {
    const token = jwtProvider.generate("-1");

    expect(token).not.toBe(null);
  });
});
