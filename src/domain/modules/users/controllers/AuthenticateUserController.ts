import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "../useCases/AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const auth = await authenticateUserUseCase.execute({
      email,
      password,
    });

    return res.status(200).json(auth);
  }
}

export { AuthenticateUserController };
