import { TYPES } from "@/constants/types";
import { IUserService } from "@/interfaces/IUserService";
import { UserViewModel } from "@/fragments/UserViewModel";
import express from "express";
import { inject } from "inversify";
import {
  controller,
  httpDelete,
  httpGet,
  requestParam,
  response,
} from "inversify-express-utils";

@controller("/users")
export class UserController {
  public constructor(
    @inject(TYPES.UserService) private readonly userService: IUserService
  ) {}

  @httpGet("/me", TYPES.AuthMiddleware)
  public async me(@response() res: express.Response): Promise<UserViewModel> {
    return res.locals.user;
  }

  @httpGet("/")
  public async findAll(): Promise<UserViewModel[]> {
    return this.userService.list();
  }

  @httpDelete("/:id")
  public async delete(@requestParam("id") id: number): Promise<boolean> {
    return this.userService.delete(id);
  }
}
