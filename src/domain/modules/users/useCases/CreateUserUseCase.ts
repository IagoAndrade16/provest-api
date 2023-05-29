import { DomainError } from "@errors/DomainError";
import { hash } from "bcryptjs";
import { inject, singleton } from "tsyringe";

import { User } from "../entities/User";
import { IUsersRepository } from "../repositories/IUsersRepository";

export type CreateUserInput = {
  name: string;
  password: string;
  email: string;
};

@singleton()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ name, password, email }: CreateUserInput): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new DomainError("USER_ALREADY_EXISTS", 400);
    }

    const passwordSecurity = User.getSecurityPasswordStatus(password, name);

    if (passwordSecurity !== "SECURE") {
      throw new DomainError(`PASSWORD_${passwordSecurity}`, 400);
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      password: passwordHash,
      email,
    });

    return user;
  }
}

export { CreateUserUseCase };
