import { app } from "@infra/app";
import request from "supertest";

describe("Create user controller", () => {
  it("test", async () => {
    await request(app).get("/courses").expect(200);
  });
});
