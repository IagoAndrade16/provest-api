import { Request, Response } from "express";
import { container } from "tsyringe";
import * as yup from "yup";

import { AuthenticateUserUseCase } from "../useCases/AuthenticateUserUseCase";

const bodySchema = yup.object().shape({
  email: yup.string().email().required().max(255),
  password: yup.string().required().max(20),
});
class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = await bodySchema.validate(req.body, {
      abortEarly: false,
    });

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const auth = await authenticateUserUseCase.execute({
      email,
      password,
    });

    return res.status(200).json(auth);
  }
}

export { AuthenticateUserController };
