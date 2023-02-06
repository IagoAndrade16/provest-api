import { DomainError } from "@errors/DomainError";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
  email: string;
  updated_at: Date;
}

@injectable()
export class AlterUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: IRequest, id: string): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new DomainError("User not found!", 400);
    }

    if (Object.keys(data).length === 0) {
      throw new DomainError("Data is missing!", 400);
    }

    await this.usersRepository.update(data, id);
  }
}
