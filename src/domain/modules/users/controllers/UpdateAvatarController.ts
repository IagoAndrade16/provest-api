import { Request, Response } from "express";
import { container } from "tsyringe";
import * as yup from "yup";

import { UpdateAvatarUseCase } from "../useCases/UpdateAvatarUseCase";

const bodySchema = yup.object().shape({
  filename: yup.string().required(),
});

export class UpdateAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { filename } = await bodySchema.validate(req.file, {
      abortEarly: false,
    });

    const updateUserAvatarUseCase = container.resolve(UpdateAvatarUseCase);

    await updateUserAvatarUseCase.execute({ userId: id, avatar: filename });

    return res.status(200).send();
  }
}
