import { DomainError } from "@errors/DomainError";
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { inject, injectable } from "tsyringe";

import { ICreateCourseDTO } from "../../dtos/ICreateCourseDTO";
import { Course } from "../../entities/Course";

@injectable()
export class CreateCourseUseCase {
  constructor(
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository
  ) {}

  async execute({
    name,
    category,
    address,
    phone,
    email,
    description,
    link,
    user_id,
  }: ICreateCourseDTO): Promise<Course> {
    if (
      !name ||
      !category ||
      !address ||
      !phone ||
      !email ||
      !description ||
      !link ||
      !user_id
    ) {
      throw new DomainError("Any data is missing!");
    }

    const course = await this.coursesRepository.create({
      name,
      category,
      address,
      phone,
      email,
      description,
      link,
      user_id,
    });

    return course;
  }
}
