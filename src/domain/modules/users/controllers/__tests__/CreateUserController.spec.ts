import { app } from "@infra/app";
import { AppDataSource } from "@infra/database";
import request from "supertest";

const route = "/users";

beforeAll(async () => {
  await AppDataSource.initialize();
  await AppDataSource.runMigrations();
});

describe("Schema validation", () => {
  it("should require necessary parameters", async () => {
    const response = await request(app).post(route).send();

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("password");
  });

  describe("Email", () => {
    it("should throw error if invalid email", async () => {
      const response = await request(app).post(route).send({
        name: "name",
        email: "invalid email",
        password: "30260389",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("email");
    });

    it("should throw error if email length > 255", async () => {
      const response = await request(app)
        .post(route)
        .send({
          name: "name",
          email: `iago${"a".repeat(255)}16@gmail.com`,
          password: "30260389",
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("email");
    });
  });

  describe("Name", () => {
    it("should throw error if name length > 255", async () => {
      const response = await request(app)
        .post(route)
        .send({
          name: "n".repeat(256),
          email: "iagoaap16@gmail.com",
          password: "30260389",
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("name");
    });
  });

  describe("Password", () => {
    it("should throw error if password length > 16", async () => {
      const response = await request(app)
        .post(route)
        .send({
          name: "name",
          email: "iagoaap16@gmail.com",
          password: "1".repeat(17),
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("password");
    });

    it("should throw error if password length < 8", async () => {
      const response = await request(app)
        .post(route)
        .send({
          name: "name",
          email: "iagoaap16@gmail.com",
          password: "1".repeat(7),
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("password");
    });
  });
});

describe("Return values", () => {
  it("should be able to create a new user", async () => {
    const response = await request(app).post(route).send({
      name: "Iago Alexandre",
      email: "iagoaap@gmail.com",
      password: "30260389",
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });
});

afterAll(async () => {
  await AppDataSource.destroy();
});
