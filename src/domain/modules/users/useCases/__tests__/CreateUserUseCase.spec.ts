import { DomainError } from "@errors/DomainError";
import { User } from "@modules/users/entities/User";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryIMemory";

import { CreateUserUseCase } from "../CreateUserUseCase";

let usecase: CreateUserUseCase;
let usersRepository: UsersRepositoryInMemory;

beforeAll(() => {
  usersRepository = new UsersRepositoryInMemory();
  usecase = new CreateUserUseCase(usersRepository);
});

it("should return USER_ALREADY_EXISTS if email already exists", async () => {
  const mockedUser = {
    name: "Iago",
    email: "user@example.com",
    password: "30260389",
  };

  jest.spyOn(usersRepository, "findByEmail").mockResolvedValueOnce({
    email: "user@example.com",
  } as User);

  await expect(usecase.execute(mockedUser)).rejects.toEqual(
    new DomainError("USER_ALREADY_EXISTS")
  );

  expect(usersRepository.findByEmail).toBeCalledWith(mockedUser.email);
});

it("should return PASSWORD_BASIC_SEQUENCE if password has basic sequence", async () => {
  const mockedUser = {
    name: "Iago",
    email: "user@example.com",
    password: "123456789",
  };

  jest.spyOn(usersRepository, "findByEmail").mockResolvedValueOnce(null);

  await expect(usecase.execute(mockedUser)).rejects.toEqual(
    new DomainError("PASSWORD_BASIC_SEQUENCE")
  );

  expect(usersRepository.findByEmail).toBeCalledTimes(1);
});

it("should return PASSWORD_INCLUDES_NAME if password includes name", async () => {
  const mockedUser = {
    name: "Iago Alexandre",
    email: "user@example.com",
    password: "3026iago",
  };

  jest.spyOn(usersRepository, "findByEmail").mockResolvedValueOnce(null);

  await expect(usecase.execute(mockedUser)).rejects.toEqual(
    new DomainError("PASSWORD_INCLUDES_NAME")
  );

  expect(usersRepository.findByEmail).toBeCalledTimes(1);
});

it("should be able to create a new user", async () => {
  const mockedUser = {
    name: "Iago",
    email: "user@example.com",
    password: "30260389",
  };

  jest.spyOn(usersRepository, "findByEmail").mockResolvedValueOnce(null);
  jest
    .spyOn(usersRepository, "create")
    .mockResolvedValueOnce(mockedUser as User);

  const res = await usecase.execute(mockedUser);

  expect(res).toHaveProperty("email");
  expect(usersRepository.findByEmail).toBeCalledWith(mockedUser.email);
  expect(usersRepository.create).toBeCalledTimes(1);
});
