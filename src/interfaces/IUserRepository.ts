import { User } from "@/entities/user.entity";

export interface IUserRepository {
  create: (user: User) => Promise<User>;
  findAll: () => Promise<User[]>;
  findById: (id: number) => Promise<User | undefined>;
  findByUsername: (username: string) => Promise<User | undefined>;
  delete: (id: number) => Promise<boolean>;
}
