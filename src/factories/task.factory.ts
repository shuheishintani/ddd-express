import { TaskInput } from "@/dto/TaskInput";
import { Task } from "@/entities/task.entity";
import { injectable } from "inversify";

@injectable()
export class TaskFactory {
  public buildTask(taskInput: TaskInput): Task {
    const { title, description } = taskInput;
    const task = new Task();
    task.title = title;
    task.description = description;
    return task;
  }
}
