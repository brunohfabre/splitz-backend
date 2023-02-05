import express, { Router } from 'express'
import multer from 'multer'
import path from 'node:path'

import { multerConfig } from './config/multer'
import { BillsController } from './controllers/billsController'
import { FriendshipsController } from './controllers/friendshipsController'
import { GroupsController } from './controllers/groupsController'
import { InvitesController } from './controllers/invites'
import { SessionsController } from './controllers/sessionsController'
import { UsersController } from './controllers/usersController'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'

const upload = multer(multerConfig)

const routes = Router()

routes.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')),
)

routes.post('/users', UsersController.create)
routes.patch(
  '/users/:id/avatar',
  ensureAuthenticated,
  upload.single('file'),
  UsersController.updateAvatar,
)

routes.get('/sessions', ensureAuthenticated, SessionsController.show)
routes.post('/sessions', SessionsController.create)

routes.use(ensureAuthenticated)

routes.get('/friendships', FriendshipsController.index)
routes.post('/friendships', FriendshipsController.create)
routes.delete('/friendships/:id', FriendshipsController.delete)

routes.get('/groups', GroupsController.index)

routes.get('/invites', InvitesController.index)
routes.put('/invites/:id', InvitesController.update)
routes.delete('/invites/:id', InvitesController.delete)

routes.get('/bills', BillsController.index)
routes.post('/bills', upload.single('file'), BillsController.create)

export { routes }
