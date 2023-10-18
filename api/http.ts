import { Context } from "elysia"

export default function http(context: Context) {
  const { query, set } = context
  if (query.trigger_error === 'true') {
    set.status = 500
    return new Response(`A server error`)
  }
  return new Response(`Hello ${query.name || 'World'} from HTTP/1.1`)
}
