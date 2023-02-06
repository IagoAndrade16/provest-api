import { v4 as uuidV4 } from "uuid";

import { ICreateCourseDTO } from "../../dtos/ICreateCourseDTO";
import { Course } from "../../entities/Course";
import { ICoursesRepository } from "../ICoursesRepository";

export class CoursesRepositoryInMemory implements ICoursesRepository {
  courses: Course[] = [];

  async create({
    name,
    category,
    address,
    phone,
    email,
    description,
    link,
    user_id,
  }: ICreateCourseDTO): Promise<Course> {
    const course = {
      id: uuidV4(),
      name,
      category,
      address,
      phone,
      email,
      description,
      link,
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    };

    Object.assign(course, {
      name,
      category,
      address,
      phone,
      email,
      description,
      link,
      user_id,
      created_at: course.created_at,
      updated_at: course.updated_at,
    });

    this.courses.push(course);

    return course;
  }

  async findByUserId(userId: string): Promise<Course> {
    const courses = this.courses.find((course) => course.user_id === userId);

    return courses;
  }
}
