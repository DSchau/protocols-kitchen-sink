import { Context } from "elysia";

export function http(context: Context) {
  const { query } = context;
  if (query.trigger_error === "true") {
    return new Response(`500: Server Error`, {
      status: 500,
    });
  }
  return new Response(`Hello ${query.name || "World"} from HTTP/1.1`);
}
