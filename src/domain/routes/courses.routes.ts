import { AlterCourseController } from "@modules/courses/controllers/AlterCourseController";
import { DeleteCourseController } from "@modules/courses/controllers/DeleteCourseController";
import { ListAllCoursesController } from "@modules/courses/controllers/ListAllCoursesController";
import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateCourseController } from "../modules/courses/controllers/CreateCourseController";

const createCourseController = new CreateCourseController();
const listAllCoursesController = new ListAllCoursesController();
const alterCourseController = new AlterCourseController();
const deleteCourseController = new DeleteCourseController();

const coursesRoutes = Router();

coursesRoutes.post("/", ensureAuthenticated, createCourseController.handle);
coursesRoutes.get("/", listAllCoursesController.handle);
coursesRoutes.patch(
  "/:course_id",
  ensureAuthenticated,
  alterCourseController.handle
);

coursesRoutes.delete(
  "/:course_id",
  ensureAuthenticated,
  deleteCourseController.handle
);

export { coursesRoutes };
