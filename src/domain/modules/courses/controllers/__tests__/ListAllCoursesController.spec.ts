import { app } from "@infra/app";
import { AppDataSource } from "@infra/database";
import request from "supertest";

describe("Create user controller", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    await AppDataSource.runMigrations();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("should be able to list all courses", async () => {
    const response = await request(app).get("/courses").send();

    expect(response.status).toBe(201);
    expect(response.body.length).toBeGreaterThanOrEqual(0);
  });
});
