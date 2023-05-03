import { Request, Response } from "express";
import { container } from "tsyringe";
import * as yup from "yup";

import { UpdateCourseInfoUseCase } from "../useCases/UpdateCourseInfoUseCase";

const bodySchema = yup.object().shape({
  name: yup.string().optional().nonNullable(),
  category: yup.string().optional().nonNullable(),
  address: yup.string().optional().nonNullable(),
  phone: yup.string().optional().nonNullable(),
  email: yup.string().optional().email().nonNullable(),
  description: yup.string().optional().nonNullable(),
  link: yup.string().optional().url().nonNullable(),
});

const paramsSchema = yup.object().shape({
  course_id: yup.string().required("course_id is a required field"),
});

export class UpdateCourseController {
  async handle(req: Request, res: Response): Promise<Response> {
    const data = await bodySchema.validate(req.body, {
      abortEarly: false,
    });

    const { course_id } = await paramsSchema.validate(req.params, {
      abortEarly: false,
    });

    const { id } = req.user;
    const updateCourseInfoUseCase = container.resolve(UpdateCourseInfoUseCase);

    await updateCourseInfoUseCase.execute(data, course_id, id);

    return res.status(200).json({
      status: "SUCCESS",
      message: "Course successfully altered!",
    });
  }
}
