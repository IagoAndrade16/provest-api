import { app } from "@infra/app";
import { hash } from "bcryptjs";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

let connection: Connection;

describe("Alter user", () => {
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
  it("should be able to alter user profile", async () => {
    const rs = await request(app).post("/users/session").send({
      email: "admin@provest.com.br",
      password: "admin",
    });

    const { token } = rs.body.auth;

    const response = await request(app)
      .patch("/users")
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
