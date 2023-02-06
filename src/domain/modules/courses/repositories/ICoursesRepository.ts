import { ICreateCourseDTO } from "../dtos/ICreateCourseDTO";
import { Course } from "../entities/Course";

export interface ICoursesRepository {
  create(data: ICreateCourseDTO): Promise<Course>;
  findByUserId(user_id: string): Promise<Course[]>;
}
