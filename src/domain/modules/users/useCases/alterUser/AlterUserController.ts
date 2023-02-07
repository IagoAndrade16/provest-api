import { Request, Response } from "express";
import { container } from "tsyringe";

import { AlterUserUseCase } from "./AlterUserUseCase";

export class AlterUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    const { id } = req.user;

    const alterUserUseCase = container.resolve(AlterUserUseCase);

    await alterUserUseCase.execute(data, id);

    return res.status(200).json({
      status: "SUCCESS",
      message: "User altered successfully",
    });
  }
}
