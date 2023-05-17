import { DomainError } from "@errors/DomainError";
import { User } from "@modules/users/entities/User";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryIMemory";
import { v4 as uuid } from "uuid";

import { ResetPasswordUseCase } from "../ResetPasswordUseCase";

let usecase: ResetPasswordUseCase;
let usersRepository: UsersRepositoryInMemory;

beforeAll(async () => {
  usersRepository = new UsersRepositoryInMemory();
  usecase = new ResetPasswordUseCase(usersRepository);
});

it("should return USER_NOT_FOUND if user not found", async () => {
  jest.spyOn(usersRepository, "findById").mockResolvedValueOnce(null);

  await expect(
    usecase.execute({
      password: "123",
      userId: uuid(),
    })
  ).rejects.toEqual(new DomainError("USER_NOT_FOUND", 400));

  expect(usersRepository.findById).toBeCalledTimes(1);
});

it("should return PASSWORD_BASIC_SEQUENCE if password has basic sequence", async () => {
  jest.spyOn(usersRepository, "findById").mockResolvedValueOnce({
    id: uuid(),
    name: "Iago",
  } as User);

  await expect(
    usecase.execute({
      password: "123",
      userId: uuid(),
    })
  ).rejects.toEqual(new DomainError("PASSWORD_BASIC_SEQUENCE", 400));

  expect(usersRepository.findById).toBeCalledTimes(1);
});

// it("should return SAME_PASSWORD if new password is same that old password", async () => {
//   jest.spyOn(usersRepository, "findById").mockResolvedValueOnce({
//     id: uuid(),
//     password: "30260389",
//     name: "Iago Alexandre",
//   } as User);

//   await expect(
//     usecase.execute({
//       password: "30260389",
//       userId: uuid(),
//     })
//   ).rejects.toEqual(new DomainError("SAME_PASSWORD", 400));

//   expect(usersRepository.findById).toBeCalledTimes(1);
// });

it("should update password", async () => {
  jest.spyOn(usersRepository, "findById").mockResolvedValueOnce({
    id: uuid(),
    password: "30260389",
    name: "Iago Alexandre",
  } as User);
  jest.spyOn(usersRepository, "update").mockResolvedValueOnce(null);

  await usecase.execute({
    password: "30260389",
    userId: uuid(),
  });

  expect(usersRepository.findById).toBeCalledTimes(1);
  expect(usersRepository.update).toBeCalledTimes(1);
});
