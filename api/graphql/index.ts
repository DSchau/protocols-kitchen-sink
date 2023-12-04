import { Elysia, DecoratorBase } from "elysia";
import { graphql } from "./graphql";
import { yoga } from "@elysiajs/graphql-yoga";
import { renderGraphiQL } from '@graphql-yoga/render-graphiql'

const router = (app: Elysia<string, DecoratorBase>) => {
  return app.use(
    yoga({
      ...graphql,
      renderGraphiQL,
      path: "/",
    }),
  );
};

export { router };
