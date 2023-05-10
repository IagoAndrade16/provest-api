import { app } from "@infra/app";
import { AppDataSource } from "@infra/database";
import request from "supertest";
import { DataSource } from "typeorm";

let connection: DataSource;

describe("Create user controller", () => {
  beforeAll(async () => {
    connection = await AppDataSource.initialize();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });

  it("should be able to list all courses", async () => {
    const response = await request(app).get("/courses").send();

    expect(response.status).toBe(201);
    expect(response.body.length).toBe(0);
  });
});
