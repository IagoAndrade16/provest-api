import { Router } from "express";

import { coursesRoutes } from "./courses.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/courses", coursesRoutes);

export { router };
