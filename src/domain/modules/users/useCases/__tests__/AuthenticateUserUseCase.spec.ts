import { DomainError } from "@errors/DomainError";
import { JwtProviderImpl } from "@infra/providers/implementations/JwtProviderImpl";
import { CoursesRepositoryInMemory } from "@modules/courses/repositories/in-memory/CoursesRepositroyInMemory";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryIMemory";

import { AuthenticateUserUseCase } from "../AuthenticateUserUseCase";
import { CreateUserUseCase } from "../CreateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let coursesRepositoryInMemory: CoursesRepositoryInMemory;
let jwtProvider: JwtProviderImpl;

describe("Auth User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    coursesRepositoryInMemory = new CoursesRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    jwtProvider = new JwtProviderImpl();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      coursesRepositoryInMemory,
      jwtProvider
    );
  });

  it("should be able to authenticate user", async () => {
    await createUserUseCase.execute({
      name: "Iago Alexandre",
      email: "iagoaap@gmail.com",
      password: "123456",
    });

    const { auth, user } = await authenticateUserUseCase.execute({
      email: "iagoaap@gmail.com",
      password: "123456",
    });

    expect(auth).toHaveProperty("token");
    expect(user).toHaveProperty("id");
  });

  it("should not be able to authenticate user with incorrect email", async () => {
    await createUserUseCase.execute({
      name: "Iago Alexandre",
      email: "iagoaap@gmail.com",
      password: "123456",
    });

    await expect(
      authenticateUserUseCase.execute({
        email: "incorrect@email.com",
        password: "123456",
      })
    ).rejects.toEqual(new DomainError("User does not exists!"));
  });

  it("should not be able to authenticate user with incorrect password", async () => {
    const user = await createUserUseCase.execute({
      name: "Iago Alexandre",
      email: "iagoaap@gmail.com",
      password: "123456",
    });

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "109238102938102",
      })
    ).rejects.toEqual(new DomainError("Incorrect password!"));
  });
});
