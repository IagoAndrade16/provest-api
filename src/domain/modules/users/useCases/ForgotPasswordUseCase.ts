import { DomainError } from "@errors/DomainError";
import { MailProvider, mailProviderAlias } from "@infra/providers/MailProvider";
import { ValidationsUtils } from "@infra/validation/ValidationUtils";
import { resolve } from "path";
import { inject, injectable } from "tsyringe";

import {
  IUsersRepository,
  usersRepositoryAlias,
} from "../repositories/IUsersRepository";

@injectable()
export class ForgotPasswordUseCase {
  constructor(
    @inject(usersRepositoryAlias)
    private usersRepository: IUsersRepository,

    @inject(mailProviderAlias)
    private mailProvider: MailProvider
  ) {}

  async execute(userId: string): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new DomainError("USER_NOT_FOUND");
    }

    if (!ValidationsUtils.validateEmail(user.email)) {
      throw new DomainError("INVALID_EMAIL");
    }

    await this.sendForgotPasswordMail(user.email, user.name);
  }
  async sendForgotPasswordMail(email: string, name: string): Promise<void> {
    const templatePath = resolve(
      __dirname,
      "..",
      "templates",
      "forgot-password.hbs"
    );

    const variables = {
      name,
      link: "link",
    };

    await this.mailProvider.send({
      path: templatePath,
      to: email,
      subject: "Link para redefinição de senha",
      variables,
    });
  }
}
