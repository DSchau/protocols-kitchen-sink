import { Context } from 'elysia'

const { BEARER_OVERRIDE } = process.env

export async function beforeHandle(context: Context) {
  try {
    const { authorization = '' } = context.headers
    const bearerToken = atob(authorization?.split(/bearer/i).pop() as string).trim()

    if (bearerToken !== BEARER_OVERRIDE) {
      return new Response('401: Unauthorized', {
        status: 401
      })
    }
  } catch (e) {
    console.error(e)
    return new Response(`500: Server Error`, {
      status: 500
    })
  }
}

export async function POST(context: Context) {
  return {
    jwt: btoa(BEARER_OVERRIDE as string)
  }
}