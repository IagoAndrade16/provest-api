import { AuthenticateUserController } from "@modules/users/controllers/AuthenticateUserController";
import { CreateUserController } from "@modules/users/controllers/CreateUserController";
import { ForgotPasswordController } from "@modules/users/controllers/ForgotPasswordController";
import { UpdateUserInfoController } from "@modules/users/controllers/UpdateUserInfoController";
import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const updateUserInfoController = new UpdateUserInfoController();
const forgotPasswordController = new ForgotPasswordController();

const usersRoutes = Router();

usersRoutes.post("/", createUserController.handle);
usersRoutes.post("/session", authenticateUserController.handle);

usersRoutes.patch("/", ensureAuthenticated, updateUserInfoController.handle);

usersRoutes.get(
  "/forgot-password",
  ensureAuthenticated,
  forgotPasswordController.handle
);

export { usersRoutes };
