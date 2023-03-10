import { DomainError } from "@errors/DomainError";
import auth from "@infra/config/auth";
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { User } from "@modules/users/entities/User";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  auth: {
    token: string;
    expInMinutes: string;
  };
  user: User;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new DomainError("User does not exists!", 400);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new DomainError("Incorrect password!", 400);
    }

    const { expires_in_token, secret_token } = auth;
    const user_courses = await this.coursesRepository.findByUserId(user.id);

    user.courses = user_courses;

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    const tokenReturn: IResponse = {
      auth: {
        token,
        expInMinutes: expires_in_token,
      },
      user,
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
