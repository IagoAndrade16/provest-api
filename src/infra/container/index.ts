import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { CoursesRepository } from "@modules/courses/repositories/implementations/CoursesRepository";
import { UsersRepository } from "@modules/users/repositories/implementations/UsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { container } from "tsyringe";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ICoursesRepository>(
  "CoursesRepository",
  CoursesRepository
);
