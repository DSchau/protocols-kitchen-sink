import { Elysia, Context } from "elysia";

import { convertToXml } from './convert-to-xml'

/*
 * Inspired by https://github.com/elysiajs/elysia-html/blob/main/src/html.ts
 */
export function xml(options = {}) {
  let instance = new Elysia({ name: '@elysiajs/xml'})
    .derive((context) => {
      context.set.headers['Content-Type'] = 'application/xml; charset=utf8'

      return context
    })

  instance.onAfterHandle(async function handlePossibleXml({ response }) {
    try {
      const val = await response

      // super naive algo
      if (typeof val === 'object') {
        return convertToXml(val);
      }
      return response
    } catch (e) {
      console.error(e)
      return response
    }
  });

  return instance
}