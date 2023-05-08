import { DomainError } from "@errors/DomainError";
import { IJwtProvider, JwtProviderAlias } from "@infra/providers/JwtProvider";
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { User } from "@modules/users/entities/User";
import { compare } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../repositories/IUsersRepository";

export type AuthUserUseCaseInput = {
  email: string;
  password: string;
};

export type AuthUserUseCaseOutPut = {
  auth: {
    token: string;
    expInMinutes: string;
  };
  user: User;
};

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository,
    @inject(JwtProviderAlias)
    private jwtProvider: IJwtProvider
  ) {}

  async execute({
    email,
    password,
  }: AuthUserUseCaseInput): Promise<AuthUserUseCaseOutPut> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new DomainError("USER_NOT_FOUND", 400);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new DomainError("USER_NOT_FOUND", 400);
    }

    const user_courses = await this.coursesRepository.findByUserId(user.id);
    user.courses = user_courses;

    const token = this.jwtProvider.generate(user.id);

    return {
      auth: {
        token,
        expInMinutes: process.env.JWT_EXPIRES_TOKEN_IN_MINUTES,
      },
      user,
    };
  }
}

export { AuthenticateUserUseCase };
