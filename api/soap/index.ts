import { Elysia, DecoratorBase } from "elysia";

import { soap } from "./soap";
import { xml } from "./xml-plugin";
import { github } from "./github";

const router = (app: Elysia<string, DecoratorBase>) => {
  return app.use(xml()).get("/ping", soap).get("/gh", github);
};

export { router };
