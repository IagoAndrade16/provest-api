import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../modules/users/useCases/CreateUserController";

const createUserController = new CreateUserController();

const usersRoutes = Router();

usersRoutes.post("/", createUserController.handle);

export { usersRoutes };
