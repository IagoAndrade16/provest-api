import { ICreateCourseDTO } from "../dtos/ICreateCourseDTO";
import { IUpdateCourseDTO } from "../dtos/IUpdateCourseDTO";
import { Course } from "../entities/Course";

export interface ICoursesRepository {
  create(data: ICreateCourseDTO): Promise<Course>;
  findByUserId(user_id: string): Promise<Course[]>;
  listAllCourses(): Promise<Course[]>;
  update(data: IUpdateCourseDTO, course_id: string): Promise<void>;
  findById(id: string): Promise<Course>;
  delete(id: string): Promise<void>;
}
