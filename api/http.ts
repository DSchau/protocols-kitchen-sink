import { Context } from "elysia"

export function http(context: Context) {
  const { query, set } = context
  if (query.trigger_error === 'true') {
    // TODO: this doesn't set the status to 500 and I have no idea why
    set.status = 500
    return new Response(`A server error`)
  }
  return new Response(`Hello ${query.name || 'World'} from HTTP/1.1`)
}
