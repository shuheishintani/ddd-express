import { TYPES } from "@/constants/types";
import { UserInput } from "@/dto/UserInput";
import { UserFactory } from "@/factories/user.factory";
import { CustomError } from "@/fragments/CustomError";
import { IUserRepository } from "@/interfaces/IUserRepository";
import { IUserService } from "@/interfaces/IUserService";
import { UserViewModel } from "@/fragments/UserViewModel";
import { inject, injectable } from "inversify";
import * as jwt from "jsonwebtoken";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository,
    @inject(TYPES.UserFactory) private userFactory: UserFactory
  ) {}

  public async me(token: string): Promise<UserViewModel> {
    let userId;
    try {
      const payload = <{ userId: string; iat: string; exp: string }>(
        jwt.verify(token, process.env.JWT_SECRET as string)
      );
      userId = payload.userId;
    } catch (err) {
      throw new CustomError("invalid token", 401);
    }

    const user = await this.userRepository.findById(parseInt(userId));
    if (!user) {
      throw new CustomError("user not found", 404);
    }
    return this.userFactory.buildUserViewModel(user);
  }

  public async list(): Promise<UserViewModel[]> {
    const users = await this.userRepository.findAll();
    return users.map((user) => this.userFactory.buildUserViewModel(user));
  }

  public async delete(id: number): Promise<boolean> {
    const deleteResult = await this.userRepository.delete(id);
    if (!deleteResult) {
      return false;
    }
    return true;
  }
}
