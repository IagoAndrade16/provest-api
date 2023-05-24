import { DomainError } from "@errors/DomainError";
import { S3Provider, S3ProviderAlias } from "@infra/providers/S3Provider";
import { inject, singleton } from "tsyringe";

import { UsersRepository } from "../repositories/implementations/UsersRepository";
import { usersRepositoryAlias } from "../repositories/IUsersRepository";

type UpdateAvatarInput = {
  userId: string;
  avatar: string;
};

@singleton()
export class UpdateAvatarUseCase {
  constructor(
    @inject(usersRepositoryAlias)
    private usersRepository: UsersRepository,

    @inject(S3ProviderAlias)
    private storageProvider: S3Provider
  ) {}

  async execute(input: UpdateAvatarInput): Promise<void> {
    const user = await this.usersRepository.findById(input.userId);

    if (!user) {
      throw new DomainError("USER_NOT_FOUND");
    }

    if (user.avatar_url) {
      await this.storageProvider.delete(user.avatar_url, "avatar");
    }

    const saveAvatarInAws = this.storageProvider.save(input.avatar, "avatar");
    const updateUserAvatar = this.usersRepository.update(
      { avatar_url: input.avatar },
      input.userId
    );

    await Promise.all([saveAvatarInAws, updateUserAvatar]);
  }
}
