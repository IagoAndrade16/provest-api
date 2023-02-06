import { DomainError } from "@errors/DomainError";
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { inject, injectable } from "tsyringe";

import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
export class ProfileUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new DomainError("User not found!", 400);
    }

    const user_courses = await this.coursesRepository.findByUserId(user.id);

    user.courses = user_courses;

    return user;
  }
}
