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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const types_1 = require("@/constants/types");
const express_1 = __importDefault(require("express"));
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    me(res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.locals.user;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.list();
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.delete(id);
        });
    }
};
__decorate([
    inversify_express_utils_1.httpGet("/me", types_1.TYPES.AuthMiddleware),
    __param(0, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "me", null);
__decorate([
    inversify_express_utils_1.httpGet("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    inversify_express_utils_1.httpDelete("/:id"),
    __param(0, inversify_express_utils_1.requestParam("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
UserController = __decorate([
    inversify_express_utils_1.controller("/users"),
    __param(0, inversify_1.inject(types_1.TYPES.UserService)),
    __metadata("design:paramtypes", [Object])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map