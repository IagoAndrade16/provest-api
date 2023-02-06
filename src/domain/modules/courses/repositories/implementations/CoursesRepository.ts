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
}