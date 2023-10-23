import { Elysia, DecoratorBase } from "elysia"
import { graphql } from "./graphql"
import { yoga } from '@elysiajs/graphql-yoga'


const router = (app: Elysia<string, DecoratorBase>) => {
  return app
    .use(yoga({
      ...graphql,
      path: '/'
    }))
}

export { router }
