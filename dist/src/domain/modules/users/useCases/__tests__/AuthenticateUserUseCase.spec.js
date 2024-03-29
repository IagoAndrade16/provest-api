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
var DomainError_1 = require("@errors/DomainError");
var JwtProviderImpl_1 = require("@infra/providers/implementations/JwtProviderImpl");
var CoursesRepositroyInMemory_1 = require("@modules/courses/repositories/in-memory/CoursesRepositroyInMemory");
var UsersRepositoryIMemory_1 = require("@modules/users/repositories/in-memory/UsersRepositoryIMemory");
var bcryptjs_1 = require("bcryptjs");
var TestUtils_1 = require("../../../../utils/TestUtils");
var AuthenticateUserUseCase_1 = require("../AuthenticateUserUseCase");
var usersRepository;
var authenticateUserUseCase;
var coursesRepository;
var jwtProvider;
var passwordHash;
var token;
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                usersRepository = new UsersRepositoryIMemory_1.UsersRepositoryInMemory();
                coursesRepository = new CoursesRepositroyInMemory_1.CoursesRepositoryInMemory();
                jwtProvider = new JwtProviderImpl_1.JwtProviderImpl();
                authenticateUserUseCase = new AuthenticateUserUseCase_1.AuthenticateUserUseCase(usersRepository, coursesRepository, jwtProvider);
                return [4 /*yield*/, (0, bcryptjs_1.hash)("123456", 8)];
            case 1:
                passwordHash = _b.sent();
                return [4 /*yield*/, TestUtils_1.TestUtils.generateBearerToken("-1")];
            case 2:
                _a = (_b.sent()).split(" "), token = _a[1];
                return [2 /*return*/];
        }
    });
}); });
describe("Auth User", function () {
    it("should return USER_NOT_FOUND if incorrect email", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.spyOn(usersRepository, "findByEmail").mockResolvedValueOnce(null);
                    return [4 /*yield*/, expect(authenticateUserUseCase.execute({
                            email: "incorrect@email.com",
                            password: "123456",
                        })).rejects.toEqual(new DomainError_1.DomainError("USER_NOT_FOUND"))];
                case 1:
                    _a.sent();
                    expect(usersRepository.findByEmail).toHaveBeenCalledWith("incorrect@email.com");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return USER_NOT_FOUND if incorrect password", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.spyOn(usersRepository, "findByEmail").mockResolvedValueOnce({
                        password: passwordHash,
                    });
                    return [4 /*yield*/, expect(authenticateUserUseCase.execute({
                            email: "iago@gmail.com",
                            password: "109238102938102",
                        })).rejects.toEqual(new DomainError_1.DomainError("USER_NOT_FOUND"))];
                case 1:
                    _a.sent();
                    expect(usersRepository.findByEmail).toHaveBeenCalledWith("iago@gmail.com");
                    return [2 /*return*/];
            }
        });
    }); });
    it("shoult return ALREADY_LOGGED if logged_token is valid", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.spyOn(usersRepository, "findByEmail").mockResolvedValueOnce({
                        id: "-1",
                        password: passwordHash,
                        email: "iago@gmail.com",
                        logged_token: token,
                    });
                    return [4 /*yield*/, expect(authenticateUserUseCase.execute({
                            email: "iago@gmail.com",
                            password: "109238102938102",
                        })).rejects.toEqual(new DomainError_1.DomainError("ALREADY_LOGGED"))];
                case 1:
                    _a.sent();
                    expect(usersRepository.findByEmail).toHaveBeenCalledWith("iago@gmail.com");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should be able to authenticate user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.spyOn(usersRepository, "findByEmail").mockResolvedValueOnce({
                        id: "-1",
                        password: passwordHash,
                        email: "iagoaap@gmail.com",
                    });
                    return [4 /*yield*/, authenticateUserUseCase.execute({
                            email: "iagoaap@gmail.com",
                            password: "123456",
                        })];
                case 1:
                    res = _a.sent();
                    expect(res).toHaveProperty("auth");
                    expect(res).toHaveProperty("user");
                    expect(usersRepository.findByEmail).toHaveBeenCalledWith("iagoaap@gmail.com");
                    return [2 /*return*/];
            }
        });
    }); });
});
