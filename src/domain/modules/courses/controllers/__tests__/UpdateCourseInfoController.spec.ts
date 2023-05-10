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
      .patch("/courses/123")
      .set({
        Authorization: "Bearer 123",
      })
      .send();

    expect(response.status).toBe(401);
    expect(response.body.message).toEqual("Invalid token");
  });

  it("should required non nullables parameters", async () => {
    const response = await request(app)
      .patch("/courses/123")
      .set({
        Authorization: authToken,
      })
      .send({
        email: null,
        link: null,
        name: null,
        category: null,
        address: null,
        phone: null,
        description: null,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("link");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("address");
    expect(response.body).toHaveProperty("category");
  });

  describe("email", () => {
    it("should required a valid email", async () => {
      const response = await request(app)
        .patch("/courses/123")
        .set({
          Authorization: authToken,
        })
        .send({
          email: "invalid email",
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("email");
    });
  });

  describe("link", () => {
    it("should required a valid link", async () => {
      const response = await request(app)
        .patch("/courses/123")
        .set({
          Authorization: authToken,
        })
        .send({
          link: "invalid link",
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("link");
    });
  });
});

describe("Return values", () => {
  it("should be able to update course", async () => {
    const { body: course } = await request(app)
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

    const response = await request(app)
      .patch(`/courses/${course.id}`)
      .send({
        name: "Curso alterado do Iago",
      })
      .set({ Authorization: authToken });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "SUCCESS",
      message: "Course successfully altered!",
    });
  });
});
