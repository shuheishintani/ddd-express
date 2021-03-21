import { User } from "@/entities/user.entity";
import { UserFactory } from "@/factories/user.factory";
import { IUserRepository } from "@/interfaces/IUserRepository";
import { injectable } from "inversify";

const userFactory = new UserFactory();
const user1 = userFactory.buildUser({ username: "hoge", password: "piyo" });
user1.created_at = new Date("2016-12-24");
user1.updated_at = new Date("2016-12-24");
const users = [user1];

@injectable()
export class MockUserRepository implements IUserRepository {
  public async create(user: User): Promise<User> {
    return user1;
  }

  public async findAll(): Promise<User[]> {
    return users;
  }

  public async findById(id: number): Promise<User | undefined> {
    return user1;
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    return user1;
  }

  public async delete(id: number): Promise<boolean> {
    return true;
  }
}
