import { TYPES } from "@/constants/types";
import { User } from "@/entities/user.entity";
import { IUserRepository } from "@/interfaces/IUserRepository";
import { DatabaseService } from "@/services/database.service";
import { inject, injectable } from "inversify";
import { Repository } from "typeorm";

@injectable()
export class UserRepository implements IUserRepository {
  db: Repository<User>;

  constructor(
    @inject(TYPES.DatabaseService) private databaseService: DatabaseService
  ) {
    this.db = databaseService.getRepository<User>(User);
  }

  public async create(user: User): Promise<User> {
    return this.db.save(user);
  }

  public async findAll(): Promise<User[]> {
    return this.db.find({});
  }

  public async findById(id: number): Promise<User | undefined> {
    return this.db.findOne(id);
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    return this.db.findOne({ username });
  }

  public async delete(id: number): Promise<boolean> {
    const deleteResult = await this.db.delete(id);
    if (deleteResult.affected === 0) {
      return false;
    }
    return true;
  }
}
