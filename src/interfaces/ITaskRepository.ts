import { Task } from "@/entities/task.entity";

export interface ITaskRepository {
  create: (task: Task) => Promise<Task>;
  findAll: () => Promise<Task[]>;
  findById: (id: number) => Promise<Task | undefined>;
  delete: (id: number) => Promise<boolean>;
}
