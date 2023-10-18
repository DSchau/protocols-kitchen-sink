import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { cors } from '@elysiajs/cors'
import { trpc } from '@elysiajs/trpc'
import { yoga } from '@elysiajs/graphql-yoga'

import http from './api/http'
import graphql from './api/graphql'
import { router as trpcRouter } from './api/trpc';
import grpc from './api/grpc';
import { version } from './api/version'

export default new Elysia({
  serve: {
    hostname: process.env.NODE_ENV === 'production' ? '0.0.0.0' : ''
  }
})
  .state('version', 1)
  .decorate('getDate', () => Date.now())
  .use(swagger())
  .use(cors())
  .get('/', http)
  .get('/version', version)
  .get('/grpc', grpc)
  .use(trpc(trpcRouter, {
    endpoint: '/trpc'
  }))
  .use(yoga(graphql))
  .ws('/ws', {
    message(ws: WebSocket, message: string) {
      ws.send(message)
    }
  })
