import { app } from "@infra/app";
import { find } from "@infra/container";
import { AppDataSource } from "@infra/database";
import { ResetPasswordUseCase } from "@modules/users/useCases/ResetPasswordUseCase";
import request from "supertest";
import { v4 as uuid } from "uuid";

import { TestUtils } from "../../../../utils/TestUtils";

const route = "/users/reset-password";
let authToken: string;

beforeAll(async () => {
  await AppDataSource.initialize();
  await AppDataSource.runMigrations();

  authToken = await TestUtils.generateBearerToken(uuid());
});

describe("Schema validation", () => {
  it("should return 401 if not authenticated", async () => {
    const response = await request(app).patch(route).send();

    expect(response.status).toBe(401);
  });

  it("should require necessary parameters", async () => {
    const response = await request(app).patch(route).send().set({
      Authorization: authToken,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("password");
  });

  describe("Password", () => {
    it("should throw error if password length > 16", async () => {
      const response = await request(app)
        .patch(route)
        .send({
          password: "1".repeat(17),
        })
        .set({
          Authorization: authToken,
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("password");
    });

    it("should throw error if password length < 8", async () => {
      const response = await request(app)
        .patch(route)
        .send({
          password: "1".repeat(7),
        })
        .set({
          Authorization: authToken,
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("password");
    });
  });
});

describe("Return values", () => {
  it("should be able update password", async () => {
    const resetPasswordUseCase = find(ResetPasswordUseCase);

    jest.spyOn(resetPasswordUseCase, "execute").mockResolvedValue(null);

    const response = await request(app)
      .patch(route)
      .send({
        password: "30260389",
      })
      .set({
        Authorization: authToken,
      });

    expect(response.status).toBe(200);
  });
});

afterAll(async () => {
  await AppDataSource.destroy();
});
