import cors from "cors";
import express from "express";
import helmet from "helmet";
import { CustomError } from "./fragments/CustomError";

export const config = (app: express.Application) => {
  app.use(
    cors({
      origin: process.env.CLIENT_ORIGIN,
      credentials: true,
      optionsSuccessStatus: 200,
    })
  );
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(helmet());
  app.use(
    (
      err: CustomError,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction
    ) => {
      console.error(err.stack);
      console.log(err.message);
      res.status(err.statusCode || 500);
      res.send({
        error: { status: err.statusCode || 500, message: err.message },
      });
    }
  );

  return app;
};
