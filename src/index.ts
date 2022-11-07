import { createCors } from 'itty-cors'
import { Router } from 'itty-router'
import { error, json, missing } from 'itty-router-extras'
import { version } from '@root/package.json'
import { routerV1 } from '~/api/v1'

// export durable object class, per spec
export * from '~/objects/Counter'

const { preflight, corsify } = createCors({
  methods: ['GET', 'POST'],
})

const router = Router()

// register v1 API plus all routes
router
  .options('*', preflight)                              // handle CORS OPTIONS requests
  .get('/version', () => json({ version }))             // GET API version number
  .all('/v1/*', routerV1.handle)                        // register v1 API
  .all('*', () => missing('Are you sure about that?'))  // 404 for all else

// CF ES6 module syntax
export default {
  fetch: (...args) => router
                        .handle(...args)
                        .catch((err) => error(500, err.stack))
                        .then(corsify),
}
