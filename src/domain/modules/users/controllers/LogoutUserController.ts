import { Request, Response } from "express";
import { container } from "tsyringe";

import { LogoutUserUseCase } from "../useCases/LogoutUserUseCase";

export class LogoutUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const logoutUserUseCase = container.resolve(LogoutUserUseCase);

    await logoutUserUseCase.execute(id);

    return res.status(200).send();
  }
}
