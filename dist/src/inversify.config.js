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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindings = void 0;
const types_1 = require("@/constants/types");
const User_1 = require("@/entities/User");
const UserService_1 = require("@/services/UserService");
const inversify_1 = require("inversify");
const typeorm_1 = require("typeorm");
exports.bindings = new inversify_1.AsyncContainerModule((bind) => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.createConnection();
    yield require("./controllers/UserController");
    bind(types_1.TYPE.UserRepository)
        .toDynamicValue(() => {
        return typeorm_1.getRepository(User_1.User);
    })
        .inRequestScope();
    bind(types_1.TYPE.UserService).to(UserService_1.UserService).inRequestScope();
}));
//# sourceMappingURL=inversify.config.js.map