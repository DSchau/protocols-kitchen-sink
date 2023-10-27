import { Context, ElysiaConfig, t } from "elysia";
import { randFullName } from '@ngneat/falso'

export const userSchema = t.Object({
  name: t.String(),
  id: t.Optional(t.String())
})

export async function GET(context: any) {
  return {
    name: randFullName(),
    id: context.params.id,
  }
}

export async function POST(context: any) {
  try {
    context.set.status = 201

    return {
      name: context.body.name,
      id: context.params.id
    }
  } catch (e) {
    console.error(e)

    return new Response(`500: Server Error`, {
      status: 500
    })
  }
}
