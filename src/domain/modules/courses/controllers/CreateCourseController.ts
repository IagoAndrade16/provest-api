import { Request, Response } from "express";
import { container, injectable } from "tsyringe";
import * as yup from "yup";

import { CreateCourseUseCase } from "../useCases/CreateCourseUseCase";

export type CreateCourseInput = {
  name: string;
  category: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  link: string;
};

const bodySchema = yup.object().shape({
  name: yup.string().required("name is a required field"),
  category: yup.string().required("category is a required field"),
  address: yup.string().required("address is a required field"),
  phone: yup.string().required("phone is a required field"),
  email: yup.string().required("email is a required field").email(),
  description: yup.string().required("description is a required field"),
  link: yup.string().required("link is a required field").url(),
});

@injectable()
export class CreateCourseController {
  async handle(req: Request, res: Response): Promise<Response> {
    const input = (await bodySchema.validate(req.body, {
      abortEarly: false,
    })) as CreateCourseInput;
    const { id: user_id } = req.user;

    const createCourseUseCase = container.resolve(CreateCourseUseCase);

    const course = await createCourseUseCase.execute({
      ...input,
      user_id,
    });

    return res.status(201).json(course);
  }
}
