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

  const app = express();
  app.use(cors({ origin: true }));
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(helmet());

  const server = new InversifyExpressServer(
    container,
    null,
    {
      rootPath: "/api",
    },
    app
  );

  server.setErrorConfig((app) => {
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
  });

  const buildServer = server.build();

  buildServer.listen(process.env.PORT || 3000, () => {
    console.log("Server is listening on port 3000");
  });
})();
