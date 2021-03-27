import { bindings } from "@/bindings";
import dotenv from "dotenv";
import express from "express";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import "reflect-metadata";
import { config } from "./express";

(async () => {
  dotenv.config();
  const container = new Container();
  await container.loadAsync(bindings);
  const app = config(express());
  const server = new InversifyExpressServer(
    container,
    null,
    {
      rootPath: "/api",
    },
    app
  );
  const buildServer = server.build();
  buildServer.listen(process.env.PORT || 3000, () => {
    console.log("Server is listening on port 3000");
  });
})();
