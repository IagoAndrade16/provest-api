import { AlterUserController } from "@modules/users/controllers/AlterUserController";
import { AuthenticateUserController } from "@modules/users/controllers/AuthenticateUserController";
import { CreateUserController } from "@modules/users/controllers/CreateUserController";
import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const alterUserController = new AlterUserController();

const usersRoutes = Router();

usersRoutes.post("/", createUserController.handle);
usersRoutes.post("/session", authenticateUserController.handle);
// usersRoutes.get("/profile", ensureAuthenticated, profileController.handle);
usersRoutes.patch("/", ensureAuthenticated, alterUserController.handle);

export { usersRoutes };
