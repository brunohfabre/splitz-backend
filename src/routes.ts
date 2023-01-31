import { Router } from 'express'

import { BillsController } from './controllers/billsController'
import { FriendsController } from './controllers/friendsController'
import { InvitesController } from './controllers/invites'
import { SessionsController } from './controllers/sessionsController'
import { UsersController } from './controllers/usersController'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'

const routes = Router()

routes.post('/users', UsersController.create)

routes.get('/sessions', ensureAuthenticated, SessionsController.show)
routes.post('/sessions', SessionsController.create)

routes.use(ensureAuthenticated)

routes.get('/friends', FriendsController.index)
routes.post('/friends', FriendsController.create)

routes.get('/invites', InvitesController.index)
routes.put('/invites/:id', InvitesController.update)
routes.delete('/invites/:id', InvitesController.delete)

routes.post('/bills', BillsController.create)

export { routes }
