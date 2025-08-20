import "dotenv/config";

import http from "http";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";

import app from "./app";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/index";

async function bootstrap() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  app.use("/graphql", expressMiddleware(server));

  const port = process.env.PORT || 4000;
  http.createServer(app).listen(port, () => {
    console.log(`API ready at http://localhost:${port}/graphql`);
  });
}

bootstrap();
