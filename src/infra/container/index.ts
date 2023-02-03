import { container } from "tsyringe";

import { ICoursesRepository } from "../../domain/modules/courses/repositories/ICoursesRepository";
import { CoursesRepository } from "../../domain/modules/courses/repositories/implementations/CoursesRepository";
import { UsersRepository } from "../../domain/modules/users/repositories/implementations/UsersRepository";
import { IUsersRepository } from "../../domain/modules/users/repositories/IUsersRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ICoursesRepository>(
  "CoursesRepository",
  CoursesRepository
);
