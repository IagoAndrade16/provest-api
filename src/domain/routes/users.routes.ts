import { AuthenticateUserController } from "@modules/users/controllers/AuthenticateUserController";
import { CreateUserController } from "@modules/users/controllers/CreateUserController";
import { ForgotPasswordController } from "@modules/users/controllers/ForgotPasswordController";
import { LogoutUserController } from "@modules/users/controllers/LogoutUserController";
import { ResetPasswordController } from "@modules/users/controllers/ResetPasswordController";
import { UpdateAvatarController } from "@modules/users/controllers/UpdateAvatarController";
import { UpdateUserInfoController } from "@modules/users/controllers/UpdateUserInfoController";
import { Router } from "express";
import multer from "multer";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import uploadConfig from "../middlewares/uploadFile";

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const updateUserInfoController = new UpdateUserInfoController();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();
const logoutUserController = new LogoutUserController();
const updateAvatarController = new UpdateAvatarController();

const usersRoutes = Router();

const upload = multer(uploadConfig);

usersRoutes.post("/", createUserController.handle);
usersRoutes.post("/auth", authenticateUserController.handle);

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
usersRoutes.patch("/logout", ensureAuthenticated, logoutUserController.handle);
usersRoutes.patch("/", ensureAuthenticated, updateUserInfoController.handle);
usersRoutes.patch(
  "/avatar_url",
  ensureAuthenticated,
  upload.single("avatar"),
  updateAvatarController.handle
);

export { usersRoutes };
