"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.UserService = void 0;
const types_1 = require("@/constants/types");
const user_factory_1 = require("@/factories/user.factory");
const CustomError_1 = require("@/fragments/CustomError");
const inversify_1 = require("inversify");
const jwt = __importStar(require("jsonwebtoken"));
let UserService = class UserService {
    constructor(userRepository, userFactory) {
        this.userRepository = userRepository;
        this.userFactory = userFactory;
    }
    me(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let userId;
            try {
                const payload = (jwt.verify(token, process.env.JWT_SECRET));
                userId = payload.userId;
            }
            catch (err) {
                throw new CustomError_1.CustomError("invalid token", 401);
            }
            const user = yield this.userRepository.findById(parseInt(userId));
            if (!user) {
                throw new CustomError_1.CustomError("user not found", 404);
            }
            return this.userFactory.buildUserViewModel(user);
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userRepository.findAll();
            return users.map((user) => this.userFactory.buildUserViewModel(user));
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteResult = yield this.userRepository.delete(id);
            if (!deleteResult) {
                return false;
            }
            return true;
        });
    }
};
UserService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.UserRepository)),
    __param(1, inversify_1.inject(types_1.TYPES.UserFactory)),
    __metadata("design:paramtypes", [Object, user_factory_1.UserFactory])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map