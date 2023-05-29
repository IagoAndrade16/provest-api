import { DomainError } from "@errors/DomainError";
import { S3Provider, S3ProviderAlias } from "@infra/providers/S3Provider";
import { inject, singleton } from "tsyringe";

import {
  IUsersRepository,
  usersRepositoryAlias,
} from "../repositories/IUsersRepository";

type UpdateAvatarInput = {
  userId: string;
  avatar: string;
};

@singleton()
export class UpdateAvatarUseCase {
  constructor(
    @inject(usersRepositoryAlias)
    private usersRepository: IUsersRepository,

    @inject(S3ProviderAlias)
    private s3Provider: S3Provider
  ) {}

  async execute(input: UpdateAvatarInput): Promise<void> {
    const user = await this.usersRepository.findById(input.userId);

    if (!user) {
      throw new DomainError("USER_NOT_FOUND");
    }

    if (user.avatar_url) {
      await this.s3Provider.delete(user.avatar_url, "avatar");
    }

    const saveAvatarInAws = await this.s3Provider.save(input.avatar, "avatar");
    const updateUserAvatar = await this.usersRepository.update(
      { avatar_url: saveAvatarInAws },
      input.userId
    );

    await Promise.all([saveAvatarInAws, updateUserAvatar]);
  }
}
