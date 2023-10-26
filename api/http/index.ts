import { Elysia, DecoratorBase } from "elysia";

import { github } from "./github";
import { ping } from './ping'
import { version } from './version'

const router = (app: Elysia<string, DecoratorBase>) => {
  return app
    .get('/ping', ping)
    .get('/version', version)
    .get('/gh', github)
};

export { router };
