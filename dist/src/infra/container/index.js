"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CoursesRepository_1 = require("@modules/courses/repositories/implementations/CoursesRepository");
var UsersRepository_1 = require("@modules/users/repositories/implementations/UsersRepository");
var tsyringe_1 = require("tsyringe");
tsyringe_1.container.registerSingleton("UsersRepository", UsersRepository_1.UsersRepository);
tsyringe_1.container.registerSingleton("CoursesRepository", CoursesRepository_1.CoursesRepository);
