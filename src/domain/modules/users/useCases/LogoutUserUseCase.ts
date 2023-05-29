import { DomainError } from "@errors/DomainError";
import { inject, singleton } from "tsyringe";

import { UsersRepository } from "../repositories/implementations/UsersRepository";
import { usersRepositoryAlias } from "../repositories/IUsersRepository";

@singleton()
export class LogoutUserUseCase {
  constructor(
    @inject(usersRepositoryAlias)
    private usersRepository: UsersRepository
  ) {}

  async execute(userId: string): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new DomainError("USER_NOT_FOUND");
    }

    if (!user.logged_token) {
      throw new DomainError("USER_NOT_LOGGED");
    }

    await this.usersRepository.update(
      {
        logged_token: null,
      },
      user.id
    );
  }
}
