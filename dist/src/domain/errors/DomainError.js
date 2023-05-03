"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainError = void 0;
var DomainError = /** @class */ (function () {
    function DomainError(message, statusCode) {
        if (statusCode === void 0) { statusCode = 400; }
        this.message = message;
        this.statusCode = statusCode;
    }
    return DomainError;
}());
exports.DomainError = DomainError;
