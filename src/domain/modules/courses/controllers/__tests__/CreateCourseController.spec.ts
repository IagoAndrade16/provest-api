import { app } from "@infra/app";
import { hash } from "bcryptjs";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

let connection: Connection;

describe("Auth user", () => {
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

  it("should be able to create a new course", async () => {
    const rs = await request(app).post("/users/session").send({
      email: "admin@provest.com.br",
      password: "admin",
    });

    const { token } = rs.body.auth;

    const response = await request(app)
      .post("/courses")
      .send({
        name: "Course do Iago",
        category: "Programação TS",
        address: "Av. Retiro",
        phone: "24998179466",
        email: "curso@email.com.br",
        description: "Novo curso!",
        link: "https://app.rocketseat.com.br/ignite",
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toEqual("Course do Iago");
  });

  it("should not be able to create a new course if !auth", async () => {
    const response = await request(app)
      .post("/courses")
      .send({
        name: "Course do Iago",
        category: "Programação TS",
        address: "Av. Retiro",
        phone: "24998179466",
        email: "curso@email.com.br",
        description: "Novo curso!",
        link: "https://app.rocketseat.com.br/ignite",
      })
      .set({ Authorization: `Bearer 123` });

    expect(response.status).toBe(401);
    expect(response.body.message).toEqual("Invalid token");
  });
});
