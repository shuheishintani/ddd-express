import { UserInput } from "@/dto/UserInput";

export interface IAuthService {
  register: (userInput: UserInput) => Promise<string>;
  login: (userInput: UserInput) => Promise<string | null>;
}
