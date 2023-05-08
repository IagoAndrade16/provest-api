import { TestUtils } from "../TestUtils";

it("should return null if !userId", async () => {
  const token = await TestUtils.generateBearerToken(null);

  expect(token).toBe(null);
});

it("should be able to return bearer token", async () => {
  const token = await TestUtils.generateBearerToken("-1");

  expect(token.includes("Bearer")).toBe(true);
});
