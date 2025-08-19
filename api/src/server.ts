import "dotenv/config";

import http from "http";
import express, { Request, Response } from "express";
import cors from "cors";

import { ApolloServer } from "@apollo/server";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/index";

import { expressMiddleware } from "@as-integrations/express4";

async function bootstrap() {
  const app = express();

  app.use(cors({ origin: "http://localhost:5173", credentials: true }));
  app.use(express.json());

  app.get("/healthz", (_req: Request, res: Response) => res.send("ok"));

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  app.use("/graphql", expressMiddleware(server));

  const port = process.env.PORT || 4000;
  http.createServer(app).listen(port, () => {
    console.log(`API ready at http://localhost:${port}/graphql`);
  });
}

bootstrap();
