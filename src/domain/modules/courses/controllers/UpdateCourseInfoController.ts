import { Request, Response } from "express";
import { container } from "tsyringe";
import * as yup from "yup";

import { UpdateCourseInfoUseCase } from "../useCases/UpdateCourseInfoUseCase";

const bodySchema = yup.object().shape({
  name: yup.string().optional(),
  category: yup.string().optional(),
  address: yup.string().optional(),
  phone: yup.string().optional(),
  email: yup.string().optional(),
  description: yup.string().optional(),
  link: yup.string().optional(),
});

const paramsSchema = yup.object().shape({
  course_id: yup.string().required("course_id is a required field"),
});

export class UpdateCourseController {
  async handle(req: Request, res: Response): Promise<Response> {
    const data = await bodySchema.validate(req.body, {
      abortEarly: true,
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
