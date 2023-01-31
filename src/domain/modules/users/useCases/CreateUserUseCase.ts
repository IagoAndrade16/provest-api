import { inject, injectable } from "tsyringe";
import "reflect-metadata";

import { DomainError } from "../../../errors/DomainError";
import { User } from "../entities/User";
import { IUsersRepository } from "../repositories/IUsersRepository";

interface IRequest {
  name: string;
  password: string;
  email: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ name, password, email }: IRequest): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new DomainError("Email already exists!", 400);
    }

    if (!name || !password || !email) {
      throw new DomainError("name, email or password is missing!", 400);
    }

    const user = await this.usersRepository.create({ name, password, email });

    return user;
  }
}

export { CreateUserUseCase };
