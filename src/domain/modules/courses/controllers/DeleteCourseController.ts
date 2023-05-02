import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteCourseUseCase } from "../useCases/DeleteCourseUseCase";

export class DeleteCourseController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { course_id } = req.params;
    const { id } = req.user;

    const deleteCourseUseCase = container.resolve(DeleteCourseUseCase);

    const response = await deleteCourseUseCase.execute({
      course_id,
      user_id: id,
    });

    return res.status(200).json(response);
  }
}
