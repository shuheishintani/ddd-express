import { TYPES } from "@/constants/types";
import { Task } from "@/entities/task.entity";
import { ITaskRepository } from "@/interfaces/ITaskRepository";
import { DatabaseService } from "@/services/database.service";
import { inject, injectable } from "inversify";
import { Repository } from "typeorm";

@injectable()
export class TaskRepository implements ITaskRepository {
  db: Repository<Task>;

  constructor(
    @inject(TYPES.DatabaseService) private databaseService: DatabaseService
  ) {
    this.db = databaseService.getRepository<Task>(Task);
  }

  public async create(task: Task): Promise<Task> {
    return this.db.save(task);
  }

  public async findAll(): Promise<Task[]> {
    return this.db.find({});
  }

  public async findById(id: number): Promise<Task | undefined> {
    return this.db.findOne(id);
  }

  public async delete(id: number): Promise<boolean> {
    const deleteResult = await this.db.delete(id);
    if (deleteResult.affected === 0) {
      return false;
    }
    return true;
  }
}
