import { Router } from 'express'

import { SessionsController } from './controllers/sessionsController'
import { UsersController } from './controllers/usersController'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'

const routes = Router()

routes.get('/', (request, response) => {
  return response.json({ routes: true })
})

routes.post('/users', UsersController.create)

routes.get('/sessions', ensureAuthenticated, SessionsController.show)
routes.post('/sessions', SessionsController.create)

// routes.use(ensureAuthenticated)

export { routes }
