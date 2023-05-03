import { DomainError } from "@errors/DomainError";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryIMemory";

import { CreateUserUseCase } from "../CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

beforeEach(() => {
  usersRepositoryInMemory = new UsersRepositoryInMemory();
  createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
});

describe("Create user", () => {
  it("should be able to create a new user", async () => {
    const user = {
      name: "Iago",
      email: "user@example.com",
      password: "123456",
    };

    const res = await createUserUseCase.execute(user);

    expect(res).toHaveProperty("id");
  });

  it("should not be able to create a new user with same email", async () => {
    const user = {
      name: "Iago",
      email: "user@example.com",
      password: "123456",
    };

    await createUserUseCase.execute(user);

    await expect(createUserUseCase.execute(user)).rejects.toEqual(
      new DomainError("Email already exists!")
    );
  });

  it("should not be able to create a new user if name, email or password is empty", async () => {
    const user = {
      name: "Iago",
      email: "user@example.com",
      password: "",
    };

    await expect(createUserUseCase.execute(user)).rejects.toEqual(
      new DomainError("name, email or password is missing!")
    );
  });
});
