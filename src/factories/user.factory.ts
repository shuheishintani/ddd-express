import { UserInput } from "@/dto/UserInput";
import { User } from "@/entities/user.entity";
import { UserViewModel } from "@/fragments/UserViewModel";
import * as bcrypt from "bcryptjs";
import { injectable } from "inversify";

@injectable()
export class UserFactory {
  public buildUser(userInput: UserInput): User {
    const { username, password } = userInput;
    const user = new User();
    user.username = username;
    user.password = bcrypt.hashSync(password, 8);
    return user;
  }

  public buildUserViewModel(user: User): UserViewModel {
    const { id, username, created_at, updated_at, tasks } = user;
    return { id, username, created_at, updated_at, tasks };
  }
}
