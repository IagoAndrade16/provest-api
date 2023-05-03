import { DomainError } from "@errors/DomainError";
import { IUpdateCourseDTO } from "@modules/courses/dtos/IUpdateCourseDTO";
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { inject, injectable } from "tsyringe";

interface IResponse {
  status: string;
  message: string;
}

@injectable()
export class UpdateCourseInfoUseCase {
  constructor(
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository
  ) {}

  async execute(
    data: IUpdateCourseDTO,
    course_id: string,
    user_id: string
  ): Promise<IResponse> {
    const course = await this.coursesRepository.findById(course_id);

    if (!course) {
      throw new DomainError("Course not found.", 400);
    }

    if (course.user_id !== user_id) {
      throw new DomainError("This user does not update this course!", 400);
    }

    if (Object.keys(data).length === 0) {
      throw new DomainError("At least one parameter is required.", 400);
    }

    Object.keys(data).forEach((key) => {
      if (!data[key])
        throw new DomainError(`Property ${key} cannot be null.`, 400);
    });

    await this.coursesRepository.update(data, course_id, user_id);

    return {
      status: "SUCESS",
      message: "Course updated successfully",
    };
  }
}
