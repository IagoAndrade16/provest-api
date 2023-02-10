import { IUpdateCourseDTO } from "@modules/courses/dtos/IUpdateCourseDTO";
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

  async findByUserId(userId: string): Promise<Course[]> {
    const listOfCourses = this.courses.filter(
      (course) => course.user_id === userId
    );

    return listOfCourses;
  }

  async listAllCourses(): Promise<Course[]> {
    return this.courses;
  }

  async update(
    {
      name,
      category,
      address,
      phone,
      email,
      description,
      link,
    }: IUpdateCourseDTO,
    course_id: string,
    user_id: string
  ): Promise<void> {
    this.courses.forEach((course) => {
      if (course.id === course_id && user_id === course.user_id) {
        if (name) course.name = name;
        if (name) course.category = category;
        if (name) course.address = address;
        if (name) course.phone = phone;
        if (name) course.email = email;
        if (name) course.description = description;
        if (name) course.link = link;
      }
    });
  }

  async findById(id: string): Promise<Course> {
    const course = this.courses.find((course) => course.id === id);

    return course;
  }

  async delete(id: string): Promise<void> {
    const course_index = this.courses.findIndex((course) => course.id === id);

    this.courses.splice(course_index, 1);
  }
}
