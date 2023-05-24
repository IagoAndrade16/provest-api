import { app } from "@infra/app";
import { AppDataSource } from "@infra/database";
import { hash } from "bcryptjs";
import request from "supertest";
import { DataSource } from "typeorm";
import { v4 as uuidV4 } from "uuid";

let connection: DataSource;

const route = "/users/auth";

beforeAll(async () => {
  connection = await AppDataSource.initialize();
  await connection.runMigrations();

  const id = uuidV4();
  const password = await hash("admin", 8);

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
  it("should required necessary parameters", async () => {
    const response = await request(app).post(route).send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("password");
  });

  describe("email", () => {
    it("should require a valid email", async () => {
      const response = await request(app).post(route).send({
        email: "invalid email",
        password: "123456",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("email");
    });

    it("should require a valid email length", async () => {
      const response = await request(app)
        .post(route)
        .send({
          email: `iago${"a".repeat(255)}@gmail.com`,
          password: "123456",
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("email");
    });
  });

  describe("password", () => {
    it("should require a valid password length", async () => {
      const response = await request(app)
        .post(route)
        .send({
          email: "admin@provest.com.br",
          password: "a".repeat(21),
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("password");
    });
  });
});

describe("Return values", () => {
  it("should be able to authenticate user", async () => {
    const response = await request(app).post(route).send({
      email: "admin@provest.com.br",
      password: "admin",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("auth");
    expect(response.body).toHaveProperty("user");
  });
});
