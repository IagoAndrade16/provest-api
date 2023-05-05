import { Request, Response } from "express";
import { container } from "tsyringe";
import * as yup from "yup";

import { UpdateUserInfoUseCase } from "../useCases/UpdateUserInfoUseCase";

const bodySchema = yup.object().shape({
  email: yup.string().optional().email().max(255),
  name: yup.string().optional().max(255),
});
export class UpdateUserInfoController {
  async handle(req: Request, res: Response): Promise<Response> {
    const data = await bodySchema.validate(req.body, { abortEarly: false });
    const { id } = req.user;

    const alterUserUseCase = container.resolve(UpdateUserInfoUseCase);

    await alterUserUseCase.execute(data, id);

    return res.status(200).json({
      status: "SUCCESS",
      message: "User altered successfully",
    });
  }
}
