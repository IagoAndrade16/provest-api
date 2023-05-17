import { DomainError } from "@errors/DomainError";
import { compare, hash } from "bcryptjs";
import { inject, singleton } from "tsyringe";

import { User } from "../entities/User";
import {
  IUsersRepository,
  usersRepositoryAlias,
} from "../repositories/IUsersRepository";

export type ResetPasswordUseCaseInput = {
  password: string;
  userId: string;
};

@singleton()
export class ResetPasswordUseCase {
  constructor(
    @inject(usersRepositoryAlias)
    private usersRepository: IUsersRepository
  ) {}
  async execute(input: ResetPasswordUseCaseInput): Promise<void> {
    const user = await this.usersRepository.findById(input.userId);

    if (!user) {
      throw new DomainError("USER_NOT_FOUND");
    }

    const passwordSecurity = User.getSecurityPasswordStatus(
      input.password,
      user.name
    );

    if (passwordSecurity !== "SECURE") {
      throw new DomainError(`PASSWORD_${passwordSecurity}`);
    }

    const isSamePassword = await compare(user.password, input.password);

    if (isSamePassword) {
      throw new DomainError("SAME_PASSWORD");
    }

    const passwordHash = await hash(input.password, 8);

    await this.usersRepository.update(
      {
        password: passwordHash,
      },
      user.id
    );
  }
}
