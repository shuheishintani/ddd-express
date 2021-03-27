import { TYPES } from "@/constants/types";
import { Task } from "@/entities/task.entity";
import { CustomError } from "@/fragments/CustomError";
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

  public async find(condition: Partial<Task>): Promise<Task[]> {
    return this.db.find(condition);
  }

  public async findById(id: number): Promise<Task | undefined> {
    return this.db.findOne(id);
  }

  public async updateById(id: number, update: Partial<Task>): Promise<Task> {
    const task = await this.findById(id);
    if (!task) {
      throw new CustomError("Task not found", 404);
    }
    return this.db.save({ ...task, ...update });
  }

  public async delete(id: number): Promise<boolean> {
    const deleteResult = await this.db.delete(id);
    if (deleteResult.affected === 0) {
      return false;
    }
    return true;
  }
}
