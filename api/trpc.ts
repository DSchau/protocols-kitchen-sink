import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

export const router = t.router({
  hello: t.procedure.query(() => "world"),
  mirror: t.procedure.input(z.string()).query(({ input }) => input),
});

export type Router = typeof router;
