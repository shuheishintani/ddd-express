import { Task } from "@/entities/task.entity";

export interface UserViewModel {
  id: number;
  username: string;
  created_at: Date;
  updated_at: Date;
  tasks: Task[];
}
