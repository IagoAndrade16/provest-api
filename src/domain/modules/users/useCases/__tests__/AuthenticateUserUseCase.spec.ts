import { DomainError } from "@errors/DomainError";
import { JwtProviderImpl } from "@infra/providers/implementations/JwtProviderImpl";
import { CoursesRepositoryInMemory } from "@modules/courses/repositories/in-memory/CoursesRepositroyInMemory";
import { User } from "@modules/users/entities/User";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryIMemory";
import { hash } from "bcryptjs";

import { AuthenticateUserUseCase } from "../AuthenticateUserUseCase";

let usersRepository: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let coursesRepository: CoursesRepositoryInMemory;
let jwtProvider: JwtProviderImpl;

let passwordHash: string;

beforeAll(async () => {
  usersRepository = new UsersRepositoryInMemory();
  coursesRepository = new CoursesRepositoryInMemory();
  jwtProvider = new JwtProviderImpl();
  authenticateUserUseCase = new AuthenticateUserUseCase(
    usersRepository,
    coursesRepository,
    jwtProvider
  );
  passwordHash = await hash("123456", 8);
});

describe("Auth User", () => {
  it("should not be able to authenticate user with incorrect email", async () => {
    jest.spyOn(usersRepository, "findByEmail").mockResolvedValueOnce(null);

    await expect(
      authenticateUserUseCase.execute({
        email: "incorrect@email.com",
        password: "123456",
      })
    ).rejects.toEqual(new DomainError("USER_NOT_FOUND"));

    expect(usersRepository.findByEmail).toHaveBeenCalledWith(
      "incorrect@email.com"
    );
  });

  it("should not be able to authenticate user with incorrect password", async () => {
    jest.spyOn(usersRepository, "findByEmail").mockResolvedValueOnce({
      password: passwordHash,
    } as User);

    await expect(
      authenticateUserUseCase.execute({
        email: "iago@gmail.com",
        password: "109238102938102",
      })
    ).rejects.toEqual(new DomainError("USER_NOT_FOUND"));

    expect(usersRepository.findByEmail).toHaveBeenCalledWith("iago@gmail.com");
  });

  it("should be able to authenticate user", async () => {
    jest.spyOn(usersRepository, "findByEmail").mockResolvedValueOnce({
      id: "-1",
      password: passwordHash,
      email: "iagoaap@gmail.com",
    } as User);

    const res = await authenticateUserUseCase.execute({
      email: "iagoaap@gmail.com",
      password: "123456",
    });

    expect(res).toHaveProperty("auth");
    expect(res).toHaveProperty("user");
  });
});
