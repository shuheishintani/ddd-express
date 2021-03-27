import { UserInput } from "@/dto/UserInput";
import { AuthResponse } from "@/fragments/AuthResponse";

export interface IAuthService {
  register: (userInput: UserInput) => Promise<AuthResponse>;
  login: (userInput: UserInput) => Promise<AuthResponse>;
}
