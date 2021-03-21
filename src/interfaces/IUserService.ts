import { UserViewModel } from "@/fragments/UserViewModel";

export interface IUserService {
  me: (token: string) => Promise<UserViewModel>;
  list: () => Promise<UserViewModel[]>;
  delete: (id: number) => Promise<boolean>;
}
