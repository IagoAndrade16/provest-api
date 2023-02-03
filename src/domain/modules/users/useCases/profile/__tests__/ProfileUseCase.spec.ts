import { DomainError } from "../../../../../errors/DomainError";
import { UsersRepositoryInMemory } from "../../../repositories/in-memory/UsersRepositoryIMemory";
import { AuthenticateUserUseCase } from "../../authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../../createUser/CreateUserUseCase";
import { ProfileUseCase } from "../ProfileUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let profileUseCase: ProfileUseCase;

describe("User prfile", () => {
  beforeAll(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    profileUseCase = new ProfileUseCase(usersRepositoryInMemory);

    await createUserUseCase.execute({
      name: "Profile",
      email: "profile@example.com",
      password: "password",
    });
  });

  it("should be able to view a user profile", async () => {
    const { user } = await authenticateUserUseCase.execute({
      email: "profile@example.com",
      password: "password",
    });

    const profile = await profileUseCase.execute(user.id);

    expect(profile).toHaveProperty("id");
    expect(profile).toHaveProperty("courses");
  });

  it("should not be able to view user profile if user does not exist", async () => {
    await expect(profileUseCase.execute("123")).rejects.toEqual(
      new DomainError("User not found!")
    );
  });
});
