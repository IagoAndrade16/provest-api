import { Request, Response } from "express";
import { container } from "tsyringe";

import { AlterCourseUseCase } from "../useCases/AlterCourseUseCase";

export class AlterCourseController {
  async handle(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    const { course_id } = req.params;
    const { id } = req.user;
    const alterCourseUseCase = container.resolve(AlterCourseUseCase);

    await alterCourseUseCase.execute(data, course_id, id);

    return res.status(200).json({
      status: "SUCCESS",
      message: "Course successfully altered!",
    });
  }
}
