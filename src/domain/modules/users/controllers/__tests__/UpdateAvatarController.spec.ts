import { app } from "@infra/app";
import { AppDataSource } from "@infra/database";
import { hash } from "bcryptjs";
import request from "supertest";
import { v4 as uuid } from "uuid";

import { TestUtils } from "../../../../utils/TestUtils";

const route = "/users/avatar-url";

let token: string;

beforeAll(async () => {
  await AppDataSource.initialize();
  await AppDataSource.runMigrations();

  const id = uuid();
  const password = await hash("admin", 8);
  token = await TestUtils.generateBearerToken(id);

  await AppDataSource.query(
    `INSERT INTO USERS(id, name, email, password, created_at, updated_at)
      values('${id}', 'Controller', 'admin@provest.com.br', '${password}', 'now()', 'now()')
    `
  );
});

describe("Schema validation", () => {
  it("should return 401 if not authenticated", async () => {
    const response = await request(app).patch(route).send();

    expect(response.status).toBe(401);
  });

  it("should require necessary parameters", async () => {
    const response = await request(app)
      .patch(route)
      .set({
        Authorization: token,
      })
      .send();

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("filename");
  });
});

describe("Return values", () => {
  it("should update avatar url", async () => {
    const response = await request(app)
      .patch(route)
      .set({
        Authorization: token,
      })
      .attach("avatar", `${__dirname}/temp/foto_teste_sds.jpeg`);

    console.log(response.body);

    expect(response.status).toBe(200);
  });
});

afterAll(async () => {
  await AppDataSource.destroy();
});
