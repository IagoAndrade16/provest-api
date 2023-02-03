import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { AuthenticateUserController } from "../modules/users/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";
import { ProfileController } from "../modules/users/useCases/profile/ProfileController";

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const profileController = new ProfileController();

const usersRoutes = Router();

usersRoutes.post("/", createUserController.handle);
usersRoutes.post("/session", authenticateUserController.handle);
usersRoutes.get("/profile", ensureAuthenticated, profileController.handle);

export { usersRoutes };
