import { TaskInput } from "@/dto/TaskInput";
import { Task } from "@/entities/task.entity";

export interface ITaskService {
  create: (taskInput: TaskInput, userId: number) => Promise<Task>;
  list: (userId: number) => Promise<Task[]>;
  delete: (id: number) => Promise<boolean>;
  update: (id: number, update: Partial<Task>) => Promise<Task>;
}
