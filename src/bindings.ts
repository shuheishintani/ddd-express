import { TYPES } from "@/constants/types";
import { IUserService } from "@/interfaces/IUserService";
import { UserService } from "@/services/user.service";
import { AsyncContainerModule } from "inversify";
import { Connection, createConnection } from "typeorm";
import { UserFactory } from "@/factories/user.factory";
import { IUserRepository } from "@/interfaces/IUserRepository";
import { AuthMiddleware } from "@/middleware/auth.middleware";
import { UserRepository } from "@/repositories/user.repository";
import { DatabaseService } from "@/services/database.service";
import { MockUserRepository } from "@/repositories/user.repository.mock";
import { TaskRepository } from "@/repositories/task.repository";
import { ITaskRepository } from "@/interfaces/ITaskRepository";
import { ITaskService } from "@/interfaces/ITaskService";
import { TaskFactory } from "@/factories/task.factory";
import { TaskService } from "@/services/task.service";
import { IAuthService } from "@/interfaces/IAuthService";
import { AuthService } from "@/services/auth.service";

export const bindings = new AsyncContainerModule(async (bind) => {
  await require("@/controllers/auth.controller");
  await require("@/controllers/user.controller");
  await require("@/controllers/task.controller");

  if (process.env.NODE_ENV === "test") {
    bind<UserFactory>(TYPES.UserFactory).to(UserFactory);
    bind<IUserRepository>(TYPES.UserRepository).to(MockUserRepository);
    bind<IUserService>(TYPES.UserService).to(UserService);
    bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware);
  } else {
    const connection = await createConnection();
    bind<Connection>(TYPES.DatabaseConnection).toConstantValue(connection);
    bind<DatabaseService>(TYPES.DatabaseService).to(DatabaseService);
    bind<UserFactory>(TYPES.UserFactory).to(UserFactory);
    bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
    bind<IUserService>(TYPES.UserService).to(UserService);
    bind<IAuthService>(TYPES.AuthService).to(AuthService);
    bind<TaskFactory>(TYPES.TaskFactory).to(TaskFactory);
    bind<ITaskRepository>(TYPES.TaskRepository).to(TaskRepository);
    bind<ITaskService>(TYPES.TaskService).to(TaskService);
    bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware);
  }
});
