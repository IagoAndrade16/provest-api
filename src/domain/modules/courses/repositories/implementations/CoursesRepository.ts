import { getRepository, Repository } from "typeorm";

import { ICreateCourseDTO } from "../../dtos/ICreateCourseDTO";
import { Course } from "../../entities/Course";
import { ICoursesRepository } from "../ICoursesRepository";

export class CoursesRepository implements ICoursesRepository {
  private repository: Repository<Course>;
  constructor() {
    this.repository = getRepository(Course);
  }

  async create(data: ICreateCourseDTO): Promise<Course> {
    const course = this.repository.create(data);

    await this.repository.save(course);

    return course;
  }

  async findByUserId(user_id: string): Promise<Course[]> {
    const courses = await this.repository.find({
      where: { user_id },
    });

    return courses;
  }

  async listAllCourses(): Promise<Course[]> {
    return this.repository.find({});
  }
}
