import { TYPES } from "@/constants/types";
import { CustomError } from "@/fragments/CustomError";
import { IUserService } from "@/interfaces/IUserService";
import express from "express";
import { inject, injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";

@injectable()
export class AuthMiddleware extends BaseMiddleware {
  public constructor(
    @inject(TYPES.UserService) private readonly userService: IUserService
  ) {
    super();
  }

  public async handler(
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const token = this.httpContext.request.headers.authorization?.split(" ")[1];

    console.log(token);

    if (!token || token === "null") {
      return next(new CustomError("token does not exist", 401));
    }

    const user = await this.userService.me(token).catch((err) => next(err));
    res.locals.user = user;
    next();
  }
}
