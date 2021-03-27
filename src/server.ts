import { bindings } from "@/bindings";
import { CustomError } from "@/fragments/CustomError";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import "reflect-metadata";

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
    app.use((_req: express.Request, res: express.Response) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "*");
      res.setHeader("Access-Control-Allow-Headers", "*");
    });
    app.use(
      cors({
        origin: "https://ddd-express-client.vercel.app/",
      })
    );
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
