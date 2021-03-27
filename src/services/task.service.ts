import { TYPES } from "@/constants/types";
import { TaskInput } from "@/dto/TaskInput";
import { Task } from "@/entities/task.entity";
import { TaskFactory } from "@/factories/task.factory";
import { CustomError } from "@/fragments/CustomError";
import { ITaskRepository } from "@/interfaces/ITaskRepository";
import { ITaskService } from "@/interfaces/ITaskService";
import { IUserRepository } from "@/interfaces/IUserRepository";
import { inject, injectable } from "inversify";

@injectable()
export class TaskService implements ITaskService {
  constructor(
    @inject(TYPES.TaskRepository) private taskRepository: ITaskRepository,
    @inject(TYPES.UserRepository) private userRepository: IUserRepository,
    @inject(TYPES.TaskFactory) private taskFactory: TaskFactory
  ) {}

  public async create(taskInput: TaskInput, userId: number): Promise<Task> {
    const task = this.taskFactory.buildTask(taskInput);
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new CustomError("User not found", 404);
    }
    task.user = user;
    return this.taskRepository.create(task);
  }

  public async list(userId: number): Promise<Task[]> {
    return this.taskRepository.find({ userId });
  }

  public async update(id: number, update: Partial<Task>): Promise<Task> {
    return this.taskRepository.updateById(id, update);
  }

  public async delete(id: number): Promise<boolean> {
    const deleteResult = await this.taskRepository.delete(id);
    if (!deleteResult) {
      return false;
    }
    return true;
  }
}
