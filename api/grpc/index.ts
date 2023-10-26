import { Elysia, DecoratorBase } from "elysia";
import { grpc } from "./grpc";

const router = (app: Elysia<string, DecoratorBase>) => {
  return app.get("/ping", grpc);
};

export { router };
