import { app } from "@infra/app";
import { find } from "@infra/container";
import { AppDataSource } from "@infra/database";
import { ForgotPasswordUseCase } from "@modules/users/useCases/ForgotPasswordUseCase";
import request from "supertest";
import { v4 as uuid } from "uuid";

import { TestUtils } from "../../../../utils/TestUtils";

const route = "/users/forgot-password";
let authToken: string;

beforeAll(async () => {
  await AppDataSource.initialize();
  await AppDataSource.runMigrations();
  authToken = await TestUtils.generateBearerToken(uuid());
});

describe("Schema validation", () => {
  it("should return 401 if not authenticated", async () => {
    const response = await request(app).get(route).send();

    expect(response.status).toBe(401);
  });
});

describe("Return values", () => {
  it("should send mail to reset password", async () => {
    const forgotPasswordUseCase = find(ForgotPasswordUseCase);

    jest.spyOn(forgotPasswordUseCase, "execute").mockResolvedValueOnce();

    const response = await request(app)
      .get(route)
      .set({
        Authorization: authToken,
      })
      .send();

    expect(response.status).toBe(200);
  });
});

afterAll(async () => {
  await AppDataSource.destroy();
});
