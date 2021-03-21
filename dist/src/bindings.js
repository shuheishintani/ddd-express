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
const user_service_1 = require("@/services/user.service");
const inversify_1 = require("inversify");
const typeorm_1 = require("typeorm");
const user_factory_1 = require("@/factories/user.factory");
const auth_middleware_1 = require("@/middleware/auth.middleware");
const user_repository_1 = require("@/repositories/user.repository");
const database_service_1 = require("@/services/database.service");
const user_repository_mock_1 = require("@/repositories/user.repository.mock");
const task_repository_1 = require("@/repositories/task.repository");
const task_factory_1 = require("./factories/task.factory");
const task_service_1 = require("./services/task.service");
const auth_service_1 = require("./services/auth.service");
exports.bindings = new inversify_1.AsyncContainerModule((bind) => __awaiter(void 0, void 0, void 0, function* () {
    yield require("@/controllers/auth.controller");
    yield require("@/controllers/user.controller");
    yield require("@/controllers/task.controller");
    if (process.env.NODE_ENV === "test") {
        bind(types_1.TYPES.UserFactory).to(user_factory_1.UserFactory);
        bind(types_1.TYPES.UserRepository).to(user_repository_mock_1.MockUserRepository);
        bind(types_1.TYPES.UserService).to(user_service_1.UserService);
        bind(types_1.TYPES.AuthMiddleware).to(auth_middleware_1.AuthMiddleware);
    }
    else {
        const connection = yield typeorm_1.createConnection();
        bind(types_1.TYPES.DatabaseConnection).toConstantValue(connection);
        bind(types_1.TYPES.DatabaseService).to(database_service_1.DatabaseService);
        bind(types_1.TYPES.UserFactory).to(user_factory_1.UserFactory);
        bind(types_1.TYPES.UserRepository).to(user_repository_1.UserRepository);
        bind(types_1.TYPES.UserService).to(user_service_1.UserService);
        bind(types_1.TYPES.AuthService).to(auth_service_1.AuthService);
        bind(types_1.TYPES.TaskFactory).to(task_factory_1.TaskFactory);
        bind(types_1.TYPES.TaskRepository).to(task_repository_1.TaskRepository);
        bind(types_1.TYPES.TaskService).to(task_service_1.TaskService);
        bind(types_1.TYPES.AuthMiddleware).to(auth_middleware_1.AuthMiddleware);
    }
}));
//# sourceMappingURL=bindings.js.map