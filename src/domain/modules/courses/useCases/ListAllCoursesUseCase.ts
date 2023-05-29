import { Course } from "@modules/courses/entities/Course";
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { inject, singleton } from "tsyringe";

@singleton()
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
