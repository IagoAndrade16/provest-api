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

  it("should be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      name: "Iago Alexandre",
      email: "iagoaap@gmail.com",
      password: "123456",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });
});
