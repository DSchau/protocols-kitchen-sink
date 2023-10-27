import { Context } from "elysia";
import { randFullName, randAlphaNumeric } from '@ngneat/falso'

export async function users(context: Context) {
  let users = new Array(100).fill(undefined).map(
    user => ({
      name: randFullName(),
      id: randAlphaNumeric({ length: 8 }).join('')
    })
  )

  return {
    users
  }
}
