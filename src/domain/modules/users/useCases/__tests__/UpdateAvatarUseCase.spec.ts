import { DomainError } from "@errors/DomainError";
import { S3ProviderImpl } from "@infra/providers/implementations/S3ProviderImpl";
import { S3Provider } from "@infra/providers/S3Provider";
import { User } from "@modules/users/entities/User";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryIMemory";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

import { UpdateAvatarUseCase } from "../UpdateAvatarUseCase";

let useCase: UpdateAvatarUseCase;
let usersRepository: IUsersRepository;
let s3Provider: S3Provider;

beforeEach(() => {
  usersRepository = new UsersRepositoryInMemory();
  s3Provider = new S3ProviderImpl();
  useCase = new UpdateAvatarUseCase(usersRepository, s3Provider);
});

it("should return USER_NOT_FOUND if user not found", async () => {
  jest.spyOn(usersRepository, "findById").mockResolvedValueOnce(null);

  await expect(
    useCase.execute({ avatar: "avatar", userId: "123" })
  ).rejects.toEqual(new DomainError("USER_NOT_FOUND"));

  expect(usersRepository.findById).toBeCalledWith("123");
});

it("should update avatar if avatar_url does not exists", async () => {
  jest.spyOn(usersRepository, "findById").mockResolvedValueOnce({
    id: "123",
  } as User);

  jest.spyOn(s3Provider, "save").mockResolvedValueOnce("url");
  jest.spyOn(usersRepository, "update").mockResolvedValueOnce(null);

  await useCase.execute({ avatar: "avatar", userId: "123" });

  expect(usersRepository.findById).toBeCalledWith("123");
  expect(s3Provider.save).toBeCalledTimes(1);
  expect(usersRepository.update).toBeCalledWith({ avatar_url: "url" }, "123");
});

it("should update avatar if avatar_url already exists", async () => {
  jest.spyOn(usersRepository, "findById").mockResolvedValueOnce({
    id: "123",
    avatar_url: "url",
  } as User);

  jest.spyOn(s3Provider, "delete").mockResolvedValueOnce();
  jest.spyOn(s3Provider, "save").mockResolvedValueOnce("url");
  jest.spyOn(usersRepository, "update").mockResolvedValueOnce(null);

  await useCase.execute({ avatar: "avatar", userId: "123" });

  expect(usersRepository.findById).toBeCalledWith("123");
  expect(s3Provider.save).toBeCalledTimes(1);
  expect(s3Provider.delete).toBeCalledTimes(1);
  expect(usersRepository.update).toBeCalledWith({ avatar_url: "url" }, "123");
});
