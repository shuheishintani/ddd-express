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
const bindings_1 = require("@/bindings");
const types_1 = require("@/constants/types");
const user_factory_1 = require("@/factories/user.factory");
const inversify_1 = require("inversify");
require("reflect-metadata");
const userFactory = new user_factory_1.UserFactory();
const user1 = userFactory.buildUser({ username: "foo", password: "bar" });
user1.created_at = new Date("2016-12-24");
user1.updated_at = new Date("2016-12-24");
const usersData = [user1];
describe("UserService", () => {
    let userService;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const container = new inversify_1.Container();
        yield container.loadAsync(bindings_1.bindings);
        userService = container.get(types_1.TYPES.UserService);
    }));
    it("should be defined", () => {
        expect(userService).toBeDefined();
    });
    describe("findAll", () => {
        it("should return all users", () => __awaiter(void 0, void 0, void 0, function* () {
            const users = yield userService.list();
            expect(users).toMatchObject(usersData.map((user) => userFactory.buildUserViewModel(user)));
        }));
    });
});
//# sourceMappingURL=user.service.test.js.map