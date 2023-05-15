"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.find = void 0;
var JwtProviderImpl_1 = require("@infra/providers/implementations/JwtProviderImpl");
var MailProviderImpl_1 = require("@infra/providers/implementations/MailProviderImpl");
var JwtProvider_1 = require("@infra/providers/JwtProvider");
var MailProvider_1 = require("@infra/providers/MailProvider");
var ICoursesRepository_1 = require("@modules/courses/repositories/ICoursesRepository");
var CoursesRepository_1 = require("@modules/courses/repositories/implementations/CoursesRepository");
var UsersRepository_1 = require("@modules/users/repositories/implementations/UsersRepository");
var IUsersRepository_1 = require("@modules/users/repositories/IUsersRepository");
var tsyringe_1 = require("tsyringe");
tsyringe_1.container.registerSingleton(IUsersRepository_1.usersRepositoryAlias, UsersRepository_1.UsersRepository);
tsyringe_1.container.registerSingleton(ICoursesRepository_1.coursesRepositoryAlias, CoursesRepository_1.CoursesRepository);
tsyringe_1.container.registerSingleton(JwtProvider_1.JwtProviderAlias, JwtProviderImpl_1.JwtProviderImpl);
tsyringe_1.container.registerSingleton(MailProvider_1.mailProviderAlias, MailProviderImpl_1.MailProviderImpl);
function find(token) {
    return tsyringe_1.container.resolve(token);
}
exports.find = find;
