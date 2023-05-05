import { DomainError } from "@errors/DomainError";
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { inject, injectable } from "tsyringe";

export type DeleteCourseInput = {
  user_id: string;
  course_id: string;
};

@injectable()
export class DeleteCourseUseCase {
  constructor(
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository
  ) {}

  async execute({ user_id, course_id }: DeleteCourseInput): Promise<void> {
    const course = await this.coursesRepository.findById(course_id);

    if (!course) {
      throw new DomainError("COURSE_NOT_FOUND", 400);
    }

    if (course.user_id !== user_id) {
      throw new DomainError("UNAUTHORIZED_DELETE", 400);
    }

    await this.coursesRepository.delete(course_id);
  }
}
