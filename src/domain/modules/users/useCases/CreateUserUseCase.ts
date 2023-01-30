import { inject, injectable } from "tsyringe";

import { DomainError } from "../../../errors/DomainError";
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

  async execute({ name, password, email }: IRequest): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new DomainError("Email already exists", 400);
    }

    await this.usersRepository.create({ name, password, email });
  }
}

export { CreateUserUseCase };
