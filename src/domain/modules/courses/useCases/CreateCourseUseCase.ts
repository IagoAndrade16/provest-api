import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { inject, singleton } from "tsyringe";

import { ICreateCourseDTO } from "../dtos/ICreateCourseDTO";
import { Course } from "../entities/Course";

@singleton()
export class CreateCourseUseCase {
  constructor(
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository
  ) {}

  async execute(input: ICreateCourseDTO): Promise<Course> {
    const course = await this.coursesRepository.create(input);

    return course;
  }
}
