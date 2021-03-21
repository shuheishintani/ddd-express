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
exports.TaskService = void 0;
const types_1 = require("@/constants/types");
const task_factory_1 = require("@/factories/task.factory");
const CustomError_1 = require("@/fragments/CustomError");
const inversify_1 = require("inversify");
let TaskService = class TaskService {
    constructor(taskRepository, userRepository, taskFactory) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.taskFactory = taskFactory;
    }
    create(taskInput, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = this.taskFactory.buildTask(taskInput);
            const user = yield this.userRepository.findById(userId);
            if (!user) {
                throw new CustomError_1.CustomError("user not found", 404);
            }
            task.user = user;
            return this.taskRepository.create(task);
        });
    }
    list(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield this.taskRepository.findAll();
            return tasks.filter((task) => task.userId === userId);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteResult = yield this.taskRepository.delete(id);
            if (!deleteResult) {
                return false;
            }
            return true;
        });
    }
};
TaskService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.TaskRepository)),
    __param(1, inversify_1.inject(types_1.TYPES.UserRepository)),
    __param(2, inversify_1.inject(types_1.TYPES.TaskFactory)),
    __metadata("design:paramtypes", [Object, Object, task_factory_1.TaskFactory])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map