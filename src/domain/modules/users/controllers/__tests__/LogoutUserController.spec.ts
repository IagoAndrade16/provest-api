import { app } from "@infra/app";
import { AppDataSource } from "@infra/database";
import { hash } from "bcryptjs";
import request from "supertest";
import { v4 as uuidV4 } from "uuid";

import { TestUtils } from "../../../../utils/TestUtils";

const route = "/users/logout";
const id = uuidV4();
let authToken: string;

beforeAll(async () => {
  await AppDataSource.initialize();
  await AppDataSource.runMigrations();
  authToken = await TestUtils.generateBearerToken(id);
  const password = await hash("admin", 8);

  await AppDataSource.query(
    `INSERT INTO USERS(id, name, email, password, created_at, updated_at, logged_token)
      values('${id}', 'Controller', 'admin@provest.com.br', '${password}', 'now()', 'now()', '123')
    `
  );
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("Schema validation", () => {
  it("should return 401 if not authenticated", async () => {
    const response = await request(app).patch(route).send({});

    expect(response.status).toBe(401);
  });
});

describe("Return values", () => {
  it("should be able to authenticate user", async () => {
    const response = await request(app)
      .patch(route)
      .set({ Authorization: authToken })
      .send();

    expect(response.status).toBe(200);
  });
});
