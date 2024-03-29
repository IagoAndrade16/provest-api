import { Request, Response } from "express";
import { container } from "tsyringe";
import * as yup from "yup";

import { DeleteCourseUseCase } from "../useCases/DeleteCourseUseCase";

const paramsSchema = yup.object().shape({
  course_id: yup.string().required().max(64),
});

export class DeleteCourseController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { course_id } = await paramsSchema.validate(req.params, {
      abortEarly: false,
    });

    const { id } = req.user;

    const deleteCourseUseCase = container.resolve(DeleteCourseUseCase);

    await deleteCourseUseCase.execute({
      course_id,
      user_id: id,
    });

    return res.status(200).json();
  }
}
