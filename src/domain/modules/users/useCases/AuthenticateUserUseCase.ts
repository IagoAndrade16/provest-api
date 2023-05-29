import { DomainError } from "@errors/DomainError";
import { JwtProvider, JwtProviderAlias } from "@infra/providers/JwtProvider";
import { Course } from "@modules/courses/entities/Course";
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { compare } from "bcryptjs";
import { inject, singleton } from "tsyringe";

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
  user: {
    id: string;
    name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
    courses: Course[];
  };
};

@singleton()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository,
    @inject(JwtProviderAlias)
    private jwtProvider: JwtProvider
  ) {}

  async execute({
    email,
    password,
  }: AuthUserUseCaseInput): Promise<AuthUserUseCaseOutPut> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new DomainError("USER_NOT_FOUND", 400);
    }

    if (user.logged_token) {
      const validToken = this.jwtProvider.verify(user.logged_token);

      if (validToken) {
        throw new DomainError("ALREADY_LOGGED");
      }
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new DomainError("USER_NOT_FOUND", 400);
    }

    const token = this.jwtProvider.generate(user.id);

    await this.usersRepository.update({ logged_token: token }, user.id);

    return {
      auth: {
        token,
        expInMinutes: process.env.JWT_EXPIRES_TOKEN_IN_MINUTES,
      },
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        courses: user.courses,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
    };
  }
}

export { AuthenticateUserUseCase };
