import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateAvatarUseCase } from "../useCases/UpdateAvatarUseCase";

export class UpdateAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const avatar = req.file.filename;

    const updateUserAvatarUseCase = container.resolve(UpdateAvatarUseCase);

    await updateUserAvatarUseCase.execute({ userId: id, avatar });

    return res.status(200).send();
  }
}
