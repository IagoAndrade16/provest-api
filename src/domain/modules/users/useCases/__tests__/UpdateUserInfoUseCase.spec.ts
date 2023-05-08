import { DomainError } from "@errors/DomainError";
import { User } from "@modules/users/entities/User";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryIMemory";

import { UpdateUserInfoUseCase } from "../UpdateUserInfoUseCase";

let useCase: UpdateUserInfoUseCase;
let usersRepository: UsersRepositoryInMemory;

beforeEach(() => {
  usersRepository = new UsersRepositoryInMemory();
  useCase = new UpdateUserInfoUseCase(usersRepository);
});

it("should throw USER_NOT_FOUND if user does not exists", async () => {
  jest.spyOn(usersRepository, "findById").mockResolvedValueOnce(null);

  await expect(
    useCase.execute(
      {
        email: "iago@gmail.com",
      },
      "1"
    )
  ).rejects.toEqual(new DomainError("USER_NOT_FOUND", 400));

  expect(usersRepository.findById).toHaveBeenCalledWith("1");
});

it("should update user if succeeded validation", async () => {
  jest.spyOn(usersRepository, "findById").mockResolvedValueOnce({
    id: "1",
  } as User);

  jest.spyOn(usersRepository, "update").mockResolvedValueOnce(null);

  await useCase.execute(
    {
      email: "iago@gmail.com",
      name: "iago",
    },
    "1"
  );

  expect(usersRepository.findById).toHaveBeenCalledWith("1");
  expect(usersRepository.update).toHaveBeenCalledWith(
    {
      email: "iago@gmail.com",
      name: "iago",
    },
    "1"
  );

  expect(usersRepository.update).toHaveBeenCalledTimes(1);
});
