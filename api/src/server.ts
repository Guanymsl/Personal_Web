import "dotenv/config";
const http = require("http");
const app = require("./app");
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
const { typeDefs } = require("./graphql/schema");
const { resolvers } = require("./graphql/resolvers");
const { buildContext } = require("./graphql/context");

const server = new ApolloServer({ typeDefs, resolvers });

async function bootstrap() {
  await server.start();
  app.use("/graphql", expressMiddleware(server, {
    context: async ({ req, res }: any) => buildContext({ req, res }),
  }));

  const port = Number(process.env.PORT || 4000);
  http.createServer(app).listen(port, () => {
    console.log(`🚀 API ready at http://localhost:${port}/graphql`);
  });
}

bootstrap();
