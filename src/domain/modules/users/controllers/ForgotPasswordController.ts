import { Request, Response } from "express";
import { container } from "tsyringe";

import { ForgotPasswordUseCase } from "../useCases/ForgotPasswordUseCase";

export class ForgotPasswordController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const forgotPasswordUseCase = container.resolve(ForgotPasswordUseCase);

    await forgotPasswordUseCase.execute(id);

    return res.status(200).send();
  }
}
