import { DomainError } from "../../../../../errors/DomainError";
import { UsersRepositoryInMemory } from "../../../repositories/in-memory/UsersRepositoryIMemory";
import { CreateUserUseCase } from "../../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "../AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe("Auth User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
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
