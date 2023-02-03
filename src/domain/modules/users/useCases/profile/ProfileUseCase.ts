import { inject, injectable } from "tsyringe";

import { DomainError } from "../../../../errors/DomainError";
import { User } from "../../entities/User";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";

@injectable()
export class ProfileUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new DomainError("User not found!", 400);
    }

    user.courses = [];

    return user;
  }
}
