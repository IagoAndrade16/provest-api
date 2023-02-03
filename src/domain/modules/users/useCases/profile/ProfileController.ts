import { Request, Response } from "express";
import { container } from "tsyringe";

import { ProfileUseCase } from "./ProfileUseCase";

export class ProfileController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const profileUseCase = container.resolve(ProfileUseCase);

    const profile = await profileUseCase.execute(id);

    return res.status(200).json(profile);
  }
}
