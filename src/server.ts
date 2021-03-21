import { bindings } from "@/bindings";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import "reflect-metadata";
import { CustomError } from "@/fragments/CustomError";
import dotenv from "dotenv";

(async () => {
  dotenv.config();
  const container = new Container();
  await container.loadAsync(bindings);

  const server = new InversifyExpressServer(container, null, {
    rootPath: "/api",
  });

  server.setConfig((app) => {
    app.use(express.json());
    app.use(
      express.urlencoded({
        extended: true,
      })
    );
    app.use(cors());
    app.use(helmet());
  });

  server.setErrorConfig((app) => {
    app.use(
      (
        err: CustomError,
        _req: express.Request,
        res: express.Response,
        _next: express.NextFunction
      ) => {
        console.error(err.stack);
        res.status(err.statusCode || 500).json(err);
      }
    );
  });

  const app = server.build();

  app.listen(process.env.PORT || 3000, () => {
    console.log("Server is listening on port 3000");
  });
})();
