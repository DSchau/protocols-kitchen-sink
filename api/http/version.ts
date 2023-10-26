import { Context } from "elysia";

export async function version(context: Context) {
  return {
    getDate: (context as any).getDate(), 
    version: (context.store as any).version
  }
}
