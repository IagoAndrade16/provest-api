import { JwtProviderImpl } from "@infra/providers/implementations/JwtProviderImpl";
import { IJwtProvider, JwtProviderAlias } from "@infra/providers/JwtProvider";
import {
  coursesRepositoryAlias,
  ICoursesRepository,
} from "@modules/courses/repositories/ICoursesRepository";
import { CoursesRepository } from "@modules/courses/repositories/implementations/CoursesRepository";
import { UsersRepository } from "@modules/users/repositories/implementations/UsersRepository";
import {
  IUsersRepository,
  usersRepositoryAlias,
} from "@modules/users/repositories/IUsersRepository";
import { container } from "tsyringe";

container.registerSingleton<IUsersRepository>(
  usersRepositoryAlias,
  UsersRepository
);

container.registerSingleton<ICoursesRepository>(
  coursesRepositoryAlias,
  CoursesRepository
);

container.registerSingleton<IJwtProvider>(JwtProviderAlias, JwtProviderImpl);
