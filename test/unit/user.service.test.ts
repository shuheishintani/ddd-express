import { bindings } from "@/bindings";
import { TYPES } from "@/constants/types";
import { UserFactory } from "@/factories/user.factory";
import { IUserService } from "@/interfaces/IUserService";
import { Container } from "inversify";
import "reflect-metadata";

const userFactory = new UserFactory();
const user1 = userFactory.buildUser({ username: "foo", password: "bar" });
user1.created_at = new Date("2016-12-24");
user1.updated_at = new Date("2016-12-24");
const usersData = [user1];

describe("UserService", () => {
  let userService: IUserService;
  beforeEach(async () => {
    const container = new Container();
    await container.loadAsync(bindings);
    userService = container.get<IUserService>(TYPES.UserService);
  });

  it("should be defined", () => {
    expect(userService).toBeDefined();
  });

  describe("findAll", () => {
    it("should return all users", async () => {
      const users = await userService.list();
      expect(users).toMatchObject(
        usersData.map((user) => userFactory.buildUserViewModel(user))
      );
    });
  });
});
