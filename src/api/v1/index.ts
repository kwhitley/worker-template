import { withDurables } from 'itty-durable'
import { Router } from 'itty-router'
import { error, text, withContent, withParams } from 'itty-router-extras'
import { withKV } from './middleware/withKV'
import { withCounter } from './middleware/withCounter'

export const routerV1 = Router({ base: '/v1' })

routerV1
  .all('*', withDurables(), withKV)

  // GET LIST OF PROJECTS
  .get('/counter/:id', withCounter,
    ({ counter }) => counter.toJSON()
  )

  // GET LIST OF PROJECTS
  .get('/counter/:id/:action', withCounter, withParams,
    ({ counter, action }) => counter[action]().toJSON()
  )

