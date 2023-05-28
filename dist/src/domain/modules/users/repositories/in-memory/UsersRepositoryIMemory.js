"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepositoryInMemory = void 0;
var uuid_1 = require("uuid");
var UsersRepositoryInMemory = /** @class */ (function () {
    function UsersRepositoryInMemory() {
        this.users = [];
    }
    UsersRepositoryInMemory.prototype.create = function (_a) {
        var name = _a.name, email = _a.email, password = _a.password;
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_b) {
                user = {
                    id: (0, uuid_1.v4)(),
                    name: name,
                    password: password,
                    email: email,
                    created_at: new Date(),
                    updated_at: new Date(),
                    courses: [],
                    logged_token: null,
                    avatar_url: "",
                };
                Object.assign(user, {
                    name: name,
                    email: email,
                    password: password,
                    id: user.id,
                    created_at: user.created_at,
                    updated_at: user.updated_at,
                    courses: [],
                    logged_token: null,
                    avatar_url: "",
                });
                this.users.push(user);
                return [2 /*return*/, user];
            });
        });
    };
    UsersRepositoryInMemory.prototype.findByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                user = this.users.find(function (user) { return user.email === email; });
                return [2 /*return*/, user];
            });
        });
    };
    UsersRepositoryInMemory.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                user = this.users.find(function (user) { return user.id === id; });
                return [2 /*return*/, user];
            });
        });
    };
    UsersRepositoryInMemory.prototype.update = function (_a, id) {
        var name = _a.name, email = _a.email;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                this.users.forEach(function (user) {
                    if (user.id === id) {
                        if (name)
                            user.name = name;
                        if (email)
                            user.email = email;
                        user.updated_at = new Date();
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    return UsersRepositoryInMemory;
}());
exports.UsersRepositoryInMemory = UsersRepositoryInMemory;
