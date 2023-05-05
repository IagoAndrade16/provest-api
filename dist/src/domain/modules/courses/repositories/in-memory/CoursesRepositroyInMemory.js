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
exports.CoursesRepositoryInMemory = void 0;
var uuid_1 = require("uuid");
var CoursesRepositoryInMemory = /** @class */ (function () {
    function CoursesRepositoryInMemory() {
        this.courses = [];
    }
    CoursesRepositoryInMemory.prototype.create = function (_a) {
        var name = _a.name, category = _a.category, address = _a.address, phone = _a.phone, email = _a.email, description = _a.description, link = _a.link, user_id = _a.user_id;
        return __awaiter(this, void 0, void 0, function () {
            var course;
            return __generator(this, function (_b) {
                course = {
                    id: (0, uuid_1.v4)(),
                    name: name,
                    category: category,
                    address: address,
                    phone: phone,
                    email: email,
                    description: description,
                    link: link,
                    user_id: user_id,
                    created_at: new Date(),
                    updated_at: new Date(),
                };
                Object.assign(course, {
                    name: name,
                    category: category,
                    address: address,
                    phone: phone,
                    email: email,
                    description: description,
                    link: link,
                    user_id: user_id,
                    created_at: course.created_at,
                    updated_at: course.updated_at,
                });
                this.courses.push(course);
                return [2 /*return*/, course];
            });
        });
    };
    CoursesRepositoryInMemory.prototype.findByUserId = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var listOfCourses;
            return __generator(this, function (_a) {
                listOfCourses = this.courses.filter(function (course) { return course.user_id === userId; });
                return [2 /*return*/, listOfCourses];
            });
        });
    };
    CoursesRepositoryInMemory.prototype.listAllCourses = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.courses];
            });
        });
    };
    CoursesRepositoryInMemory.prototype.update = function (_a, _course_id) {
        var name = _a.name, category = _a.category, address = _a.address, phone = _a.phone, email = _a.email, description = _a.description, link = _a.link;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                this.courses.forEach(function (course) {
                    course.name = name;
                    course.category = category;
                    course.address = address;
                    course.phone = phone;
                    course.email = email;
                    course.description = description;
                    course.link = link;
                });
                return [2 /*return*/];
            });
        });
    };
    CoursesRepositoryInMemory.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var course;
            return __generator(this, function (_a) {
                course = this.courses.find(function (course) { return course.id === id; });
                return [2 /*return*/, course];
            });
        });
    };
    CoursesRepositoryInMemory.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var course_index;
            return __generator(this, function (_a) {
                course_index = this.courses.findIndex(function (course) { return course.id === id; });
                this.courses.splice(course_index, 1);
                return [2 /*return*/];
            });
        });
    };
    return CoursesRepositoryInMemory;
}());
exports.CoursesRepositoryInMemory = CoursesRepositoryInMemory;
