import { AppDataSource } from "@infra/database";
import { User } from "@modules/users/entities/User";
import { v4 as uuid } from "uuid";

import { UsersRepository } from "../implementations/UsersRepository";
import { IUsersRepository } from "../IUsersRepository";

let usersRepo: IUsersRepository;

beforeAll(async () => {
  usersRepo = new UsersRepository();
  await AppDataSource.initialize();
  await AppDataSource.runMigrations();
});

const deleteUserById = async (id: string) => {
  await AppDataSource.getRepository(User).delete({ id });
};

describe("insert", () => {
  it("should be able to insert new user", async () => {
    const userCreated = await usersRepo.create({
      email: "user@example.com",
      name: "user",
      password: "123456",
    });

    expect(userCreated).toHaveProperty("id");

    const user = await usersRepo.findById(userCreated.id);

    expect(user).not.toBeNull();
    expect(user).toMatchObject(userCreated);

    await deleteUserById(userCreated.id);
  });
});

describe("findById", () => {
  it("should return null if user does not exists", async () => {
    const user = await usersRepo.findById(uuid());

    expect(user).toBeNull();
  });

  it("should be able to find user if exists", async () => {
    const userCreated = await usersRepo.create({
      email: "user@example.com",
      name: "user",
      password: "123456",
    });

    const user = await usersRepo.findById(userCreated.id);

    expect(user).not.toBeNull();
    expect(user).toMatchObject(userCreated);

    await deleteUserById(userCreated.id);
  });
});

describe("findByEmail", () => {
  it("should return null if user email does not exists", async () => {
    const user = await usersRepo.findById(uuid());

    expect(user).toBeNull();
  });

  it("should be able to find user by email if exists", async () => {
    const userCreated = await usersRepo.create({
      email: "user@example.com",
      name: "user",
      password: "123456",
    });

    const user = await usersRepo.findByEmail(userCreated.email);

    expect(user).not.toBeNull();
    expect(user).toMatchObject(userCreated);

    await deleteUserById(userCreated.id);
  });
});

describe("update", () => {
  it("shoudl be able update user if exists", async () => {
    const userCreated = await usersRepo.create({
      email: "iago@gmail.com",
      password: "123456",
      name: "Iago",
    });

    await usersRepo.update({ name: "Iago Alexandre" }, userCreated.id);

    const user = await usersRepo.findById(userCreated.id);

    expect(user.name).toBe("Iago Alexandre");
    expect(user).toMatchObject({
      email: "iago@gmail.com",
      password: userCreated.password,
      name: "Iago Alexandre",
      created_at: userCreated.created_at,
      id: userCreated.id,
      updated_at: user.updated_at,
    } as User);

    expect(user.updated_at).not.toBe(userCreated.updated_at);
  });
});

afterAll(async () => {
  await AppDataSource.destroy();
});
