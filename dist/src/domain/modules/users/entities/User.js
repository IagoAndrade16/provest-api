"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var typeorm_1 = require("typeorm");
var uuid_1 = require("uuid");
var Course_1 = require("../../courses/entities/Course");
var User = /** @class */ (function () {
    function User() {
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
        }
    }
    User.isBasicSequencePassword = function (password) {
        var basicSequence = "123456789";
        var inverseBasicSequence = "987654321";
        if (basicSequence.includes(password) ||
            inverseBasicSequence.includes(password)) {
            return true;
        }
        var sequences = [
            "123",
            "234",
            "345",
            "456",
            "567",
            "678",
            "789",
            "876",
            "765",
            "654",
            "543",
            "432",
            "321",
        ];
        var contadorSequencias = 0;
        for (var i = 0; i < sequences.length; i += 1) {
            if (password.includes(sequences[i])) {
                contadorSequencias += 1;
            }
        }
        if (contadorSequencias >= 1)
            return true;
        return false;
    };
    User.passwordIncludesName = function (password, name) {
        var splitedName = name.split(" ");
        var includeName = false;
        splitedName.forEach(function (name) {
            if (password.toLowerCase().includes(name.toLowerCase())) {
                includeName = true;
            }
        });
        return includeName;
    };
    User.getSecurityPasswordStatus = function (password, name) {
        if (this.passwordIncludesName(password, name))
            return "INCLUDES_NAME";
        if (this.isBasicSequencePassword(password)) {
            return "BASIC_SEQUENCE";
        }
        return "SECURE";
    };
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", String)
    ], User.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], User.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], User.prototype, "updated_at", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return Course_1.Course; }),
        (0, typeorm_1.JoinTable)({
            name: "courses",
            joinColumns: [{ name: "user_id" }],
            inverseJoinColumns: [{ name: "id" }],
        }),
        __metadata("design:type", Array)
    ], User.prototype, "courses", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar" }),
        __metadata("design:type", String)
    ], User.prototype, "logged_token", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
        __metadata("design:type", String)
    ], User.prototype, "avatar_url", void 0);
    User = __decorate([
        (0, typeorm_1.Entity)("users"),
        __metadata("design:paramtypes", [])
    ], User);
    return User;
}());
exports.User = User;
