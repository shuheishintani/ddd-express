import { TYPES } from "@/constants/types";
import { UserInput } from "@/dto/UserInput";
import { UserFactory } from "@/factories/user.factory";
import { CustomError } from "@/fragments/CustomError";
import { IAuthService } from "@/interfaces/IAuthService";
import { IUserRepository } from "@/interfaces/IUserRepository";
import { inject, injectable } from "inversify";
import * as jwt from "jsonwebtoken";

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository,
    @inject(TYPES.UserFactory) private userFactory: UserFactory
  ) {}

  public async register(userInput: UserInput): Promise<string> {
    const user = this.userFactory.buildUser(userInput);
    const savedUser = await this.userRepository.create(user);
    const token = jwt.sign({ userId: savedUser.id }, "secret", {
      expiresIn: "1h",
    });
    return token;
  }

  public async login(userInput: UserInput): Promise<string | null> {
    const { username, password } = userInput;
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new CustomError("user not found", 404);
    }
    if (!user.passwordIsValid(password)) {
      throw new CustomError("invalid password", 401);
    }
    const token = jwt.sign({ userId: user.id }, "secret", { expiresIn: "1h" });
    return token;
  }
}
