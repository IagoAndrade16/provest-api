import { Request, Response } from "express";
import { container } from "tsyringe";
import * as yup from "yup";

import {
  CreateUserInput,
  CreateUserUseCase,
} from "../useCases/CreateUserUseCase";

const bodySchema = yup.object().shape({
  name: yup.string().required().max(255),
  password: yup.string().required().min(8).max(16),
  email: yup.string().required().email().max(255),
});

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const input = await bodySchema.validate(req.body, { abortEarly: false });

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute(input as CreateUserInput);

    return res.status(201).send(user);
  }
}

export { CreateUserController };
