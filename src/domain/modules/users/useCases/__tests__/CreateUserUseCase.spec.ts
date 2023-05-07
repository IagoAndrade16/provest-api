import { DomainError } from "@errors/DomainError";
import { User } from "@modules/users/entities/User";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryIMemory";

import { CreateUserUseCase } from "../CreateUserUseCase";

let usecase: CreateUserUseCase;
let usersRepository: UsersRepositoryInMemory;

const mockedUser = {
  name: "Iago",
  email: "user@example.com",
  password: "123456",
};

beforeAll(() => {
  usersRepository = new UsersRepositoryInMemory();
  usecase = new CreateUserUseCase(usersRepository);
});

describe("Create user", () => {
  it("should not be able to create a new user with same email", async () => {
    jest.spyOn(usersRepository, "findByEmail").mockResolvedValueOnce({
      email: "user@example.com",
    } as User);

    await expect(usecase.execute(mockedUser)).rejects.toEqual(
      new DomainError("USER_ALREADY_EXISTS")
    );

    expect(usersRepository.findByEmail).toBeCalledWith(mockedUser.email);
  });

  it("should be able to create a new user", async () => {
    jest.spyOn(usersRepository, "findByEmail").mockResolvedValueOnce(null);
    jest
      .spyOn(usersRepository, "create")
      .mockResolvedValueOnce(mockedUser as User);

    const res = await usecase.execute(mockedUser);

    expect(res).toHaveProperty("email");
    expect(usersRepository.findByEmail).toBeCalledWith(mockedUser.email);
    expect(usersRepository.create).toBeCalledTimes(1);
  });
});
