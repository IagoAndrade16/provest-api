import { DomainError } from "@errors/DomainError";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { User } from "../entities/User";
import { IUsersRepository } from "../repositories/IUsersRepository";

export type CreateUserInput = {
  name: string;
  password: string;
  email: string;
};

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ name, password, email }: CreateUserInput): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new DomainError("Email already exists!", 400);
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
