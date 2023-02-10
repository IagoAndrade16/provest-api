import { DomainError } from "@errors/DomainError";
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  user_id: string;
  course_id: string;
}

interface IResponse {
  status: string;
  message: string;
}

@injectable()
export class DeleteCourseUseCase {
  constructor(
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository
  ) {}

  async execute({ user_id, course_id }: IRequest): Promise<IResponse> {
    const course = await this.coursesRepository.findById(course_id);

    if (!course) {
      throw new DomainError("Course not found", 400);
    }

    if (course.user_id !== user_id) {
      throw new DomainError(
        "This course does not be delete for this user!",
        400
      );
    }

    await this.coursesRepository.delete(course_id);

    return {
      status: "SUCCESS",
      message: "Course deleted successfully",
    };
  }
}
