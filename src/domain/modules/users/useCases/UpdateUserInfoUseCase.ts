import { DomainError } from "@errors/DomainError";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";

@injectable()
export class UpdateUserInfoUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: IUpdateUserDTO, userId: string): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new DomainError("USER_NOT_FOUND", 400);
    }

    await this.usersRepository.update(data, userId);
  }
}
