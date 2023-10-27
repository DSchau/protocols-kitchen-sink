import { Elysia, DecoratorBase } from "elysia";

import { github } from "./github";
import { ping } from './ping'
import { version } from './version'
import { users, getUser, updateUser, beforeHandle, getJwt, userSchema } from './users/'

const router = (app: Elysia<string, DecoratorBase>) => {
  return app
    .get('/ping', ping)
    .get('/version', version)
    .get('/gh', github)
    .group('/users', usersRouter => {
      return usersRouter
        .post('/jwt', getJwt)
        .get('/', users, { beforeHandle: beforeHandle as any })
        .get('/:id', getUser, { beforeHandle: beforeHandle as any })
        .post('/:id', updateUser, { beforeHandle: beforeHandle as any, body: userSchema })
    })
};

export { router };
