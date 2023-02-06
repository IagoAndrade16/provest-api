import { ListAllCoursesController } from "@modules/courses/useCases/listCourses/ListAllCoursesController";
import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateCourseController } from "../modules/courses/useCases/createCourse/CreateCourseController";

const createCourseController = new CreateCourseController();
const listAllCoursesController = new ListAllCoursesController();

const coursesRoutes = Router();

coursesRoutes.post("/", ensureAuthenticated, createCourseController.handle);
coursesRoutes.get("/", listAllCoursesController.handle);

export { coursesRoutes };
