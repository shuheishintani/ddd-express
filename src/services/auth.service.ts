import { TYPES } from "@/constants/types";
import { UserInput } from "@/dto/UserInput";
import { UserFactory } from "@/factories/user.factory";
import { AuthResponse } from "@/fragments/AuthResponse";
import { CustomError } from "@/fragments/CustomError";
import { UserViewModel } from "@/fragments/UserViewModel";
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

  public async register(userInput: UserInput): Promise<AuthResponse> {
    const user = this.userFactory.buildUser(userInput);
    const savedUser = await this.userRepository.create(user);
    const token = jwt.sign(
      { userId: savedUser.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );
    const viewModelUser = this.userFactory.buildUserViewModel(savedUser);
    return { token, user: viewModelUser };
  }

  public async login(userInput: UserInput): Promise<AuthResponse> {
    const { username, password } = userInput;
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new CustomError("user not found", 404);
    }
    if (!user.passwordIsValid(password)) {
      throw new CustomError("invalid password", 401);
    }
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    const viewModelUser = this.userFactory.buildUserViewModel(user);
    return { token, user: viewModelUser };
  }
}
