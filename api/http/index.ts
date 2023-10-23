import { Elysia, DecoratorBase } from "elysia"
import { http } from "./http"
import { github  } from "./github"

const router = (app: Elysia<string, DecoratorBase>) => {
  return app
    .get("/ping", http)
    .get("/gh", github)
}

export { router }
