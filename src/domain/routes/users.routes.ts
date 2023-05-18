import { AuthenticateUserController } from "@modules/users/controllers/AuthenticateUserController";
import { CreateUserController } from "@modules/users/controllers/CreateUserController";
import { ForgotPasswordController } from "@modules/users/controllers/ForgotPasswordController";
import { ResetPasswordController } from "@modules/users/controllers/ResetPasswordController";
import { UpdateUserInfoController } from "@modules/users/controllers/UpdateUserInfoController";
import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const updateUserInfoController = new UpdateUserInfoController();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

const usersRoutes = Router();

usersRoutes.post("/", createUserController.handle);
usersRoutes.post("/auth", authenticateUserController.handle);

usersRoutes.patch("/", ensureAuthenticated, updateUserInfoController.handle);

usersRoutes.get(
  "/forgot-password",
  ensureAuthenticated,
  forgotPasswordController.handle
);

usersRoutes.patch(
  "/reset-password",
  ensureAuthenticated,
  resetPasswordController.handle
);

export { usersRoutes };
