import { app } from "@infra/app";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { TestUtils } from "../../../../utils/TestUtils";

let connection: Connection;

const userId = uuidV4();
let authToken: string;

beforeAll(async () => {
  connection = await createConnection();
  await connection.runMigrations();

  authToken = await TestUtils.generateBearerToken(userId);
});

afterAll(async () => {
  await connection.dropDatabase();
  await connection.close();
});

describe("Schema validation", () => {
  it("should return 401 if unauthorized authenticate", async () => {
    const response = await request(app)
      .delete(`/courses/123`)
      .send()
      .set({ Authorization: `Bearer 123` });

    expect(response.status).toBe(401);
    expect(response.body.message).toEqual("Invalid token");
  });

  it("should require a necessary parameters", async () => {
    const response = await request(app)
      .delete(`/courses/${"a".repeat(65)}`)
      .send()
      .set({ Authorization: authToken });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("course_id");
  });
});

describe("Return values", () => {
  it("should be able to delete course", async () => {
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
      .delete(`/courses/${course.id}`)
      .send({})
      .set({ Authorization: authToken });

    expect(response.status).toBe(200);
  });
});
