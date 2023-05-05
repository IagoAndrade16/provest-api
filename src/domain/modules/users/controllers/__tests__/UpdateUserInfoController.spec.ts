import { app } from "@infra/app";
import { hash } from "bcryptjs";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

let connection: Connection;
const authRoute = "/users/session";
const route = "/users";

beforeAll(async () => {
  connection = await createConnection();
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
  await connection.close();
});

describe("Schema validation", () => {
  it("should require optional parameters when passed", async () => {
    const authRes = await request(app).post(authRoute).send({
      email: "admin@provest.com.br",
      password: "admin",
    });

    const { token } = authRes.body.auth;

    const response = await request(app)
      .patch(route)
      .send({
        email: null,
        name: null,
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("name");
  });
  describe("email", () => {
    it("should require a valid email", async () => {
      const authRes = await request(app).post(authRoute).send({
        email: "admin@provest.com.br",
        password: "admin",
      });

      const { token } = authRes.body.auth;

      const response = await request(app)
        .patch(route)
        .set({ Authorization: `Bearer ${token}` })
        .send({
          email: "invalid email",
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("email");
      expect(response.body).not.toHaveProperty("name");
    });

    it("should require a valid email length", async () => {
      const authRes = await request(app).post(authRoute).send({
        email: "admin@provest.com.br",
        password: "admin",
      });

      const { token } = authRes.body.auth;

      const response = await request(app)
        .patch(route)
        .set({
          Authorization: `Bearer ${token}`,
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
      const authRes = await request(app).post(authRoute).send({
        email: "admin@provest.com.br",
        password: "admin",
      });

      const { token } = authRes.body.auth;

      const response = await request(app)
        .patch(route)
        .set({
          Authorization: `Bearer ${token}`,
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
    const authRes = await request(app).post(authRoute).send({
      email: "admin@provest.com.br",
      password: "admin",
    });

    const { token } = authRes.body.auth;

    const response = await request(app)
      .patch(route)
      .send({
        email: "admin@admin.com",
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "SUCCESS",
      message: "User altered successfully",
    });
  });
});
