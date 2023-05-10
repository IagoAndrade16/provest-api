import { app } from "@infra/app";
import { AppDataSource } from "@infra/database";
import request from "supertest";
import { DataSource } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { TestUtils } from "../../../../utils/TestUtils";

let connection: DataSource;

const userId = uuidV4();
let authToken: string;

beforeAll(async () => {
  connection = await AppDataSource.initialize();
  await connection.runMigrations();

  authToken = await TestUtils.generateBearerToken(userId);
});

afterAll(async () => {
  await connection.dropDatabase();
  await connection.destroy();
});

describe("Schema validation", () => {
  it("should return 401 if unauthorized authenticate", async () => {
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

  it("should be require a necessary parameters", async () => {
    const response = await request(app)
      .post("/courses")
      .send({})
      .set({ Authorization: authToken });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("category");
    expect(response.body).toHaveProperty("address");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("link");
  });

  describe("email", () => {
    it("should be require a valid email", async () => {
      const response = await request(app)
        .post("/courses")
        .send({
          name: "Course do Iago",
          category: "Programação TS",
          address: "Av. Retiro",
          phone: "24998179466",
          email: "email.com.br",
          description: "Novo curso!",
          link: "https://app.rocketseat.com.br/ignite",
        })
        .set({ Authorization: authToken });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("email");
      expect(response.body).not.toHaveProperty("name");
    });
  });

  describe("link", () => {
    it("should be require a valid link", async () => {
      const response = await request(app)
        .post("/courses")
        .send({
          name: "Course do Iago",
          category: "Programação TS",
          address: "Av. Retiro",
          phone: "24998179466",
          email: "iago@email.com.br",
          description: "Novo curso!",
          link: "a".repeat(50),
        })
        .set({ Authorization: authToken });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("link");
      expect(response.body).not.toHaveProperty("email");
    });
  });
});

describe("Return values", () => {
  it("should be able to create a new course", async () => {
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
      .set({ Authorization: authToken });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toEqual("Course do Iago");
  });
});
