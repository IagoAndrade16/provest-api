"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
var AuthenticateUserController_1 = require("@modules/users/controllers/AuthenticateUserController");
var CreateUserController_1 = require("@modules/users/controllers/CreateUserController");
var UpdateUserInfoController_1 = require("@modules/users/controllers/UpdateUserInfoController");
var express_1 = require("express");
var ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
var createUserController = new CreateUserController_1.CreateUserController();
var authenticateUserController = new AuthenticateUserController_1.AuthenticateUserController();
var updateUserInfoController = new UpdateUserInfoController_1.UpdateUserInfoController();
var usersRoutes = (0, express_1.Router)();
exports.usersRoutes = usersRoutes;
usersRoutes.post("/", createUserController.handle);
usersRoutes.post("/session", authenticateUserController.handle);
// usersRoutes.get("/profile", ensureAuthenticated, profileController.handle);
usersRoutes.patch("/", ensureAuthenticated_1.ensureAuthenticated, updateUserInfoController.handle);
