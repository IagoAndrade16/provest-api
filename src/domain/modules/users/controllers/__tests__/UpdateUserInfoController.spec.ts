import { app } from "@infra/app";
import { AppDataSource } from "@infra/database";
import { hash } from "bcryptjs";
import request from "supertest";
import { DataSource } from "typeorm";
import { v4 as uuid } from "uuid";

import { TestUtils } from "../../../../utils/TestUtils";

let connection: DataSource;
const route = "/users";

let token: string;

beforeAll(async () => {
  connection = await AppDataSource.initialize();
  await connection.runMigrations();

  const id = uuid();
  const password = await hash("admin", 8);
  token = await TestUtils.generateBearerToken(id);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, created_at, updated_at)
      values('${id}', 'Controller', 'admin@provest.com.br', '${password}', 'now()', 'now()')
    `
  );
});

afterAll(async () => {
  await connection.dropDatabase();
  await connection.destroy();
});

describe("Schema validation", () => {
  it("should require optional parameters when passed", async () => {
    const response = await request(app)
      .patch(route)
      .send({
        email: null,
        name: null,
      })
      .set({ Authorization: token });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("name");
  });
  describe("email", () => {
    it("should require a valid email", async () => {
      const response = await request(app)
        .patch(route)
        .set({ Authorization: token })
        .send({
          email: "invalid email",
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("email");
      expect(response.body).not.toHaveProperty("name");
    });

    it("should require a valid email length", async () => {
      const response = await request(app)
        .patch(route)
        .set({
          Authorization: token,
        })
        .send({
          email: `iago${"a".repeat(255)}@gmail.com`,
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("email");
      expect(response.body).not.toHaveProperty("name");
    });
  });

  describe("name", () => {
    it("should require a valid name length", async () => {
      const response = await request(app)
        .patch(route)
        .set({
          Authorization: token,
        })
        .send({
          name: "a".repeat(256),
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("name");
      expect(response.body).not.toHaveProperty("email");
    });
  });
});

describe("Return values", () => {
  it("should be able to alter user profile", async () => {
    const response = await request(app)
      .patch(route)
      .send({
        email: "admin@admin.com",
      })
      .set({ Authorization: token });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "SUCCESS",
      message: "User altered successfully",
    });
  });
});
