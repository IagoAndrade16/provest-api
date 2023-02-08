import { AlterCourseController } from "@modules/courses/useCases/alterCourse/AlterCourseController";
import { ListAllCoursesController } from "@modules/courses/useCases/listCourses/ListAllCoursesController";
import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateCourseController } from "../modules/courses/useCases/createCourse/CreateCourseController";

const createCourseController = new CreateCourseController();
const listAllCoursesController = new ListAllCoursesController();
const alterCourseController = new AlterCourseController();

const coursesRoutes = Router();

coursesRoutes.post("/", ensureAuthenticated, createCourseController.handle);
coursesRoutes.get("/", listAllCoursesController.handle);
coursesRoutes.patch(
  "/:course_id",
  ensureAuthenticated,
  alterCourseController.handle
);

export { coursesRoutes };
