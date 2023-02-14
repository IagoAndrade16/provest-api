import { app } from "@infra/app";
import request from "supertest";
import { Connection, createConnection } from "typeorm";

let connection: Connection;

describe("Create user controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to list all courses", async () => {
    const response = await request(app).get("/courses").send();

    expect(response.status).toBe(201);
    expect(response.body.length).toBe(0);
  });
});
