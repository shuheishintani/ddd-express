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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const types_1 = require("@/constants/types");
const CustomError_1 = require("@/fragments/CustomError");
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
let AuthMiddleware = class AuthMiddleware extends inversify_express_utils_1.BaseMiddleware {
    constructor(userService) {
        super();
        this.userService = userService;
    }
    handler(_req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = this.httpContext.request.headers.authorization;
            if (!token || token === "null") {
                return next(new CustomError_1.CustomError("token does not exist", 401));
            }
            const user = yield this.userService.me(token).catch((err) => next(err));
            res.locals.user = user;
            next();
        });
    }
};
AuthMiddleware = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.UserService)),
    __metadata("design:paramtypes", [Object])
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map