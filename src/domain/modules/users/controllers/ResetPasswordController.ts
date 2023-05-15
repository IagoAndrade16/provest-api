import { Request, Response } from "express";
import { container } from "tsyringe";
import * as yup from "yup";

import { ResetPasswordUseCase } from "../useCases/ResetPasswordUseCase";

const bodySchema = yup.object().shape({
  password: yup.string().required().min(8).max(16),
});

export class ResetPasswordController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { password } = await bodySchema.validate(req.body, {
      abortEarly: false,
    });
    const { id: userId } = req.user;

    const resetPasswordUserUseCase = container.resolve(ResetPasswordUseCase);

    await resetPasswordUserUseCase.execute({
      userId,
      password,
    });

    return res.status(200).send();
  }
}
