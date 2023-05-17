import { DomainError } from "@errors/DomainError";
import { MailProviderImpl } from "@infra/providers/implementations/MailProviderImpl";
import { MailProvider } from "@infra/providers/MailProvider";
import { User } from "@modules/users/entities/User";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryIMemory";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { v4 as uuid } from "uuid";

import { ForgotPasswordUseCase } from "../ForgotPasswordUseCase";

let usecase: ForgotPasswordUseCase;
let usersRepository: IUsersRepository;

let mailProvider: MailProvider;

beforeAll(() => {
  usersRepository = new UsersRepositoryInMemory();
  mailProvider = new MailProviderImpl();
  usecase = new ForgotPasswordUseCase(usersRepository, mailProvider);
});

const userId = uuid();

it("should throw USER_NOT_FOUND if user does not exists", async () => {
  jest.spyOn(usersRepository, "findById").mockResolvedValueOnce(null);

  await expect(usecase.execute(userId)).rejects.toEqual(
    new DomainError("USER_NOT_FOUND")
  );

  expect(usersRepository.findById).toBeCalledWith(userId);
});

it("should throw INVALID_EMAIL if user email is invalid", async () => {
  jest.spyOn(usersRepository, "findById").mockResolvedValueOnce({
    email: "invalid email",
  } as User);

  await expect(usecase.execute(userId)).rejects.toEqual(
    new DomainError("INVALID_EMAIL")
  );

  expect(usersRepository.findById).toBeCalledWith(userId);
});

it("should send mail to reset password", async () => {
  jest.spyOn(usersRepository, "findById").mockResolvedValueOnce({
    email: "iagoaap@gmail.com",
    name: "Iago Alexandre",
  } as User);
  jest.spyOn(usecase, "sendForgotPasswordMail").mockResolvedValueOnce(null);

  await usecase.execute(userId);

  expect(usersRepository.findById).toBeCalledWith(userId);
  expect(usecase.sendForgotPasswordMail).toBeCalledWith(
    "iagoaap@gmail.com",
    "Iago Alexandre"
  );
});
