import { Course } from "@modules/courses/entities/Course";
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListAllCoursesUseCase {
  constructor(
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository
  ) {}

  async execute(): Promise<Course[]> {
    const courses = await this.coursesRepository.listAllCourses();

    return courses;
  }
}
