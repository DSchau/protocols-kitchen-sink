import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { cors } from '@elysiajs/cors'
import { trpc } from '@elysiajs/trpc'

import { router as httpRouter } from './api/http/'
import { router as trpcRouter } from './api/trpc';
import { router as grpcRouter } from './api/grpc/';
import { router as soapRouter } from './api/soap/'
import { router as graphqlRouter } from './api/graphql/'

import { version } from './api/version'

const app = new Elysia({
  serve: {
    hostname: process.env.NODE_ENV === 'production' ? '0.0.0.0' : ''
  }
})
  .state('version', 1)
  .decorate('getDate', () => Date.now())
  .use(swagger())
  .use(cors())
  .get('/version', version)
  .use(trpc(trpcRouter, {
    endpoint: '/trpc'
  }))
  .group('/graphql', graphqlRouter as any) // TODO: Type correctly
  .group('/grpc', grpcRouter as any) // TODO: Type correctly
  .group('/http', httpRouter as any) // TODO: Type correctly
  .group('/soap', soapRouter as any) // TODO: Type correctly
  // NOTE: This /ws has to be last!
  .ws('/ws', {
    message(ws, message) {
        ws.send({
            message,
            time: Date.now()
        })
    }
  })
  .listen(process.env.WEBSOCKET_PORT || 8080)

  export default app
