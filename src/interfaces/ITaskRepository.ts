import { Task } from "@/entities/task.entity";

export interface ITaskRepository {
  create: (task: Task) => Promise<Task>;
  find: (condition: Partial<Task>) => Promise<Task[]>;
  findById: (id: number) => Promise<Task | undefined>;
  updateById: (id: number, update: Partial<Task>) => Promise<Task>;
  delete: (id: number) => Promise<boolean>;
}
