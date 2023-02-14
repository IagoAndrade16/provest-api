import { AlterUserController } from "@modules/users/useCases/alterUser/AlterUserController";
import { AuthenticateUserController } from "@modules/users/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
// import { ProfileController } from "@modules/users/useCases/profile/ProfileController";
import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
// const profileController = new ProfileController();
const alterUserController = new AlterUserController();

const usersRoutes = Router();

usersRoutes.post("/", createUserController.handle);
usersRoutes.post("/session", authenticateUserController.handle);
// usersRoutes.get("/profile", ensureAuthenticated, profileController.handle);
usersRoutes.patch("/", ensureAuthenticated, alterUserController.handle);

export { usersRoutes };
