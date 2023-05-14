import { JwtProviderImpl } from "@infra/providers/implementations/JwtProviderImpl";
import { MailProviderImpl } from "@infra/providers/implementations/MailProviderImpl";
import { JwtProvider, JwtProviderAlias } from "@infra/providers/JwtProvider";
import { MailProvider, mailProviderAlias } from "@infra/providers/MailProvider";
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

container.registerSingleton<JwtProvider>(JwtProviderAlias, JwtProviderImpl);
container.registerSingleton<MailProvider>(mailProviderAlias, MailProviderImpl);
