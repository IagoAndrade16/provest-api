import { DomainError } from "@errors/DomainError";
import { IUpdateCourseDTO } from "@modules/courses/dtos/IUpdateCourseDTO";
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { inject, singleton } from "tsyringe";

@singleton()
export class UpdateCourseInfoUseCase {
  constructor(
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository
  ) {}

  async execute(
    data: IUpdateCourseDTO,
    course_id: string,
    user_id: string
  ): Promise<void> {
    const course = await this.coursesRepository.findById(course_id);

    if (!course) {
      throw new DomainError("COURSE_NOT_FOUND", 400);
    }

    if (course.user_id !== user_id) {
      throw new DomainError("UNAUTHORIZED_UPDATE", 400);
    }

    await this.coursesRepository.update(data, course_id);
  }
}
