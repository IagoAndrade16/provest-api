import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCourseUseCase } from "../useCases/CreateCourseUseCase";

export class CreateCourseController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, category, address, phone, email, description, link } =
      req.body;

    const { id: user_id } = req.user;

    const createCourseUseCase = container.resolve(CreateCourseUseCase);

    const course = await createCourseUseCase.execute({
      name,
      category,
      address,
      phone,
      email,
      description,
      link,
      user_id,
    });

    return res.status(201).json(course);
  }
}
