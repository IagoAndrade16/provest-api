import { JwtProviderImpl } from "@infra/providers/implementations/JwtProviderImpl";
import { MailProviderImpl } from "@infra/providers/implementations/MailProviderImpl";
import { S3ProviderImpl } from "@infra/providers/implementations/S3ProviderImpl";
import { JwtProvider, JwtProviderAlias } from "@infra/providers/JwtProvider";
import { MailProvider, mailProviderAlias } from "@infra/providers/MailProvider";
import { S3Provider, S3ProviderAlias } from "@infra/providers/S3Provider";
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
import { container, InjectionToken } from "tsyringe";

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
container.registerSingleton<S3Provider>(S3ProviderAlias, S3ProviderImpl);

export function find<T>(token: InjectionToken<T>): T {
  return container.resolve(token);
}
