import { Course } from "@modules/courses/entities/Course";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAllCoursesUseCase } from "./ListAllCoursesUseCase";

export class ListAllCoursesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listAllCoursesUseCase = container.resolve(ListAllCoursesUseCase);

    const courses: Course[] = await listAllCoursesUseCase.execute();

    return res.status(201).json(courses);
  }
}
