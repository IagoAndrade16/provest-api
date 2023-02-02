import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { AuthenticateUserController } from "../modules/users/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

const usersRoutes = Router();

usersRoutes.post("/", createUserController.handle);
usersRoutes.post("/session", authenticateUserController.handle);

export { usersRoutes };
