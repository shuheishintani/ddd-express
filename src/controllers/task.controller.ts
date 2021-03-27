import { TYPES } from "@/constants/types";
import { Task } from "@/entities/task.entity";
import { ITaskService } from "@/interfaces/ITaskService";
import express from "express";
import { inject } from "inversify";
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  request,
  requestParam,
  response,
} from "inversify-express-utils";

@controller("/tasks")
export class TaskController {
  public constructor(
    @inject(TYPES.TaskService) private readonly taskService: ITaskService
  ) {}

  @httpGet("/", TYPES.AuthMiddleware)
  public async list(
    @request() _req: express.Request,
    @response() res: express.Response
  ): Promise<Task[]> {
    const { id } = res.locals.user;
    return this.taskService.list(id);
  }

  @httpPost("/", TYPES.AuthMiddleware)
  public async create(
    @request() req: express.Request,
    @response() res: express.Response
  ): Promise<Task> {
    const { id } = res.locals.user;
    return this.taskService.create(req.body, id);
  }

  @httpDelete("/:id", TYPES.AuthMiddleware)
  public async delete(@requestParam("id") id: number): Promise<boolean> {
    return this.taskService.delete(id);
  }

  @httpPost("/:id", TYPES.AuthMiddleware)
  public async update(
    @request() req: express.Request,
    @requestParam("id") id: number
  ): Promise<Task> {
    return this.taskService.update(id, req.body);
  }
}
