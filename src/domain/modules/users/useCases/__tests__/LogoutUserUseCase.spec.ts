import { DomainError } from "@errors/DomainError";
import { User } from "@modules/users/entities/User";
import { UsersRepository } from "@modules/users/repositories/implementations/UsersRepository";

import { LogoutUserUseCase } from "../LogoutUserUseCase";

let usersRepository: UsersRepository;
let logoutUserUseCase: LogoutUserUseCase;

beforeAll(async () => {
  usersRepository = new UsersRepository();
  logoutUserUseCase = new LogoutUserUseCase(usersRepository);
});

it("should return USER_NOT_FOUND if user does not exists", async () => {
  jest.spyOn(usersRepository, "findById").mockResolvedValueOnce(null);

  await expect(logoutUserUseCase.execute("-1")).rejects.toEqual(
    new DomainError("USER_NOT_FOUND")
  );

  expect(usersRepository.findById).toHaveBeenCalledWith("-1");
});

it("should return USER_NOT_LOGGED !logged_token", async () => {
  jest.spyOn(usersRepository, "findById").mockResolvedValueOnce({
    logged_token: null,
  } as User);

  await expect(logoutUserUseCase.execute("-1")).rejects.toEqual(
    new DomainError("USER_NOT_LOGGED")
  );

  expect(usersRepository.findById).toHaveBeenCalledWith("-1");
});

it("should logout user", async () => {
  jest.spyOn(usersRepository, "findById").mockResolvedValueOnce({
    id: "-1",
    logged_token: "123",
    email: "iagoaap@gmail.com",
  } as User);

  jest.spyOn(usersRepository, "update").mockResolvedValueOnce(null);

  await logoutUserUseCase.execute("-1");

  expect(usersRepository.findById).toHaveBeenCalledWith("-1");
  expect(usersRepository.update).toBeCalledWith({ logged_token: null }, "-1");
});
