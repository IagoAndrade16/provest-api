import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateCourseController } from "../modules/courses/useCases/createCourse/CreateCourseController";

const createCourseController = new CreateCourseController();

const coursesRoutes = Router();

coursesRoutes.post("/", ensureAuthenticated, createCourseController.handle);

export { coursesRoutes };
