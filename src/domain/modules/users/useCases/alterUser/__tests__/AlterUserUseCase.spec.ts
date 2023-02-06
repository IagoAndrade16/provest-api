import { DomainError } from "@errors/DomainError";
import { CoursesRepositoryInMemory } from "@modules/courses/repositories/in-memory/CoursesRepositroyInMemory";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryIMemory";

import { CreateUserUseCase } from "../../createUser/CreateUserUseCase";
import { ProfileUseCase } from "../../profile/ProfileUseCase";
import { AlterUserUseCase } from "../AlterUserUseCase";

let alterUserUseCase: AlterUserUseCase;
let usersRepository: UsersRepositoryInMemory;
let coursesRepository: CoursesRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let profileUseCase: ProfileUseCase;

describe("Alter user", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    coursesRepository = new CoursesRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    alterUserUseCase = new AlterUserUseCase(usersRepository);
    profileUseCase = new ProfileUseCase(usersRepository, coursesRepository);
  });

  it("should be able to alter user", async () => {
    const user = await createUserUseCase.execute({
      name: "Iago",
      email: "iagoaap16@gmail.com",
      password: "123456",
    });

    await alterUserUseCase.execute(
      {
        name: "Iago Alexandre",
      },
      user.id
    );

    const profile = await profileUseCase.execute(user.id);

    expect(profile.name).toEqual("Iago Alexandre");
  });

  it("should not be able to alter user if no data", async () => {
    const user = await createUserUseCase.execute({
      name: "Iago",
      email: "iagoaap16@gmail.com",
      password: "123456",
    });

    await expect(alterUserUseCase.execute({}, user.id)).rejects.toEqual(
      new DomainError("Data is missing!")
    );
  });

  it("should not be able to alter user if user not exists", async () => {
    await expect(
      alterUserUseCase.execute(
        {
          name: "Iago",
        },
        "123"
      )
    ).rejects.toEqual(new DomainError("User not found!"));
  });
});
