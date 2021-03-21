import { TYPES } from "@/constants/types";
import { IAuthService } from "@/interfaces/IAuthService";
import express from "express";
import { inject } from "inversify";
import { controller, httpPost, request } from "inversify-express-utils";

@controller("/auth")
export class AuthController {
  public constructor(
    @inject(TYPES.UserService) private readonly authService: IAuthService
  ) {}

  @httpPost("/register")
  public async create(@request() req: express.Request): Promise<string> {
    return this.authService.register(req.body);
  }

  @httpPost("/login")
  public async login(@request() req: express.Request): Promise<string | null> {
    return this.authService.login(req.body);
  }
}
